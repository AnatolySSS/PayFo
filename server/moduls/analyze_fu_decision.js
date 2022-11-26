const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const { DOMParser, XMLSerializer } = require("@xmldom/xmldom")

let decisions = []
let paragraphs = []
export function decision_check(files){
  decisions.length = 0
  paragraphs.length = 0
  
  new Promise(function(resolve, reject) {
    for (var i = 0; i < files.length; i++) {
      decisions[i] = {
        data: {},
        paragraphs : [],
      }
      decision_download(i, files[i])
    }
    setTimeout(() => resolve(decisions), 1000)
  }).then(result => {
    show_decisions(result)
  })
  console.log(decisions)
  
  //{
  // let request = new XMLHttpRequest();
  // request.open("POST", "/decision_analize", true)
  // request.setRequestHeader("Content-Type", "application/json")
  
  // request.send(JSON.stringify(data))
  
  // request.addEventListener("load", function () {
  //     // получаем и парсим ответ сервера
  //     let result = JSON.parse(request.response);
  //     console.log(result);
  // });
  //}
  
}

function decision_download(i, file) {
  return new Promise(function(resolve, reject) {
    // let file = files[i]
    let reader = new FileReader();
    reader.readAsArrayBuffer(file)
    reader.onload = function() {
      paragraphs = getParagraphs(reader.result)
      decisions[i].number = file.name
      decisions[i].size = file.size
      for (let k = 0; k < paragraphs.length; k++) {
        if (paragraphs[k] != "") {
          decisions[i].paragraphs.push({
            type : "",
            text : paragraphs[k]
          })
        }
      }
      resolve(decisions[i].paragraphs)
    }
  }).then(result => {
    decision_analize(i, result)
  })
}

function str2xml(str) {
  if (str.charCodeAt(0) === 65279) {
      // BOM sequence
      str = str.substr(1);
  }
  return new DOMParser().parseFromString(str, "text/xml");
}

function getParagraphs(content) {
  const zip = new PizZip(content);
  const xml = str2xml(zip.files["word/document.xml"].asText());
  const paragraphsXml = xml.getElementsByTagName("w:p");
  const paragraphs = []

  for (let i = 0, len = paragraphsXml.length; i < len; i++) {
      let fullText = "";
      const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
      for (let j = 0, len2 = textsXml.length; j < len2; j++) {
          const textXml = textsXml[j];
          if (textXml.childNodes) {
            try {
              fullText += textXml.childNodes[0].nodeValue;
            } catch (error) {
              console.log(error);
            }
            
          }
      }
    paragraphs.push(fullText);
  }
  return paragraphs;
}

function decision_analize (i, paragraphs) {

  let paragraphs_found = new Set();
  paragraphs_found.clear();

  for (let j = 0; j < paragraphs.length; j++) {

    let current_paragraph = paragraphs[j].text.trim()
    current_paragraph = current_paragraph.replaceAll(/(?=\s)[^\r\n\t]/g, ' ')
    current_paragraph = current_paragraph.replaceAll('‑', '-')
    current_paragraph = current_paragraph.replaceAll('‒', '-')
    current_paragraph = current_paragraph.replaceAll('–', '-')
    current_paragraph = current_paragraph.replaceAll('—', '-')
    current_paragraph = current_paragraph.replaceAll(' - ', ' – ')
    //Определение наименования решения (1)
    if (!paragraphs_found.has("Наименование")) {
      if (current_paragraph == "ОБ УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ") {
        decisions[i].data["Результат"] = "УДОВЛЕТВОРИТЬ"
        decisions[i].paragraphs[j].type = "Наименование"
        paragraphs_found.add("Наименование")
        continue
      } else if (current_paragraph == "ОБ ОТКАЗЕ В УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ") {
        decisions[i].data["Результат"] = "ОТКАЗАТЬ"
        decisions[i].paragraphs[j].type = "Наименование"
        paragraphs_found.add("Наименование")
        continue
      } else if (current_paragraph == "О ПРЕКРАЩЕНИИ РАССМОТРЕНИЯ ОБРАЩЕНИЯ") {
        decisions[i].data["Результат"] = "ПРЕКРАТИТЬ"
        decisions[i].paragraphs[j].type = "Наименование"
        paragraphs_found.add("Наименование")
        continue
      }
    }
    
    //Определение абзаца преамбулы (2)
    if (!paragraphs_found.has("Преамбула")) {
      if (current_paragraph.indexOf("по результатам рассмотрения обращения") >= 0 &&
          (current_paragraph.indexOf("далее – Финансовый уполномоченный") >= 0 ||
          current_paragraph.indexOf("далее – Уполномоченный") >= 0) &&
          (current_paragraph.indexOf("Писаревский") >= 0 ||
          current_paragraph.indexOf("Климов") >= 0 ||
          current_paragraph.indexOf("Никитина") >= 0 ||
          current_paragraph.indexOf("Максимова") >= 0 ||
          current_paragraph.indexOf("Новак") >= 0 ||
          current_paragraph.indexOf("Воронин") >= 0 ||
          current_paragraph.indexOf("Савицкая") >= 0)) {
        decisions[i].paragraphs[j].type = "Преамбула"
        decisions[i].data["Номер обращения"] = paragraph_analize(current_paragraph).number
        decisions[i].data["ФУ"] = paragraph_analize(current_paragraph).fu_name
        decisions[i].data["Наименование ФО"] = paragraph_analize(current_paragraph).fo_name
        decisions[i].data["ИНН ФО"] = paragraph_analize(current_paragraph).fo_inn
        decisions[i].data["ФИО Заявителя"] = paragraph_analize(current_paragraph).app_name
        paragraphs_found.add("Преамбула")
        continue
      }
    }

    //Определение абзаца с требованиями к фу (3)
    if (!paragraphs_found.has("Требования к фу")) {
      if (current_paragraph.indexOf("полномоченному на рассмотрение") >= 0 &&
          current_paragraph.indexOf("поступило") >= 0 &&
          current_paragraph.indexOf("в отношении") >= 0 &&
          (current_paragraph.indexOf("требовани") >= 0 ||
          current_paragraph.indexOf("взыскании") >= 0)) {
        decisions[i].paragraphs[j].type = "Требования к фу"
        decisions[i].data["Договор страхования"] = paragraph_analize(current_paragraph).contract_type
        decisions[i].data["Основное требование"] = paragraph_analize(current_paragraph).sv
        decisions[i].data["Неустойка"] = paragraph_analize(current_paragraph).penalty
        decisions[i].data["Без износа"] = paragraph_analize(current_paragraph).wear
        paragraphs_found.add("Требования к фу")
        continue
      }
    }

    //Определение абзаца с ответом фо на запрос фу (4)
    if (!paragraphs_found.has("Ответ фо на запрос фу")) {
      if ((current_paragraph.indexOf("предостав") >= 0 ||
          current_paragraph.indexOf("представ") >= 0) &&
          current_paragraph.indexOf("документы") >= 0 &&
          current_paragraph.indexOf("растор") == -1 &&
          current_paragraph.indexOf("Заявит") == -1) {
        decisions[i].paragraphs[j].type = "Ответ фо на запрос фу"
        paragraphs_found.add("Ответ фо на запрос фу")
        continue
      }
    }

    //Определение абзаца с договором заявителя (5)
    if (!paragraphs_found.has("Договор заявителя")) {
      if ((current_paragraph.indexOf("между Заявителем и") >= 0 &&
          current_paragraph.indexOf("заключен") >= 0) || (current_paragraph.indexOf("ражданская ответственность Заявителя") >= 0 &&
          current_paragraph.indexOf("застрахована") >= 0) || (current_paragraph.indexOf("между") >= 0 &&
          current_paragraph.indexOf("Потребитель") >= 0 &&
          current_paragraph.indexOf("заключен договор") >= 0) &&
          current_paragraph.indexOf("оглашение") == -1) {
        decisions[i].paragraphs[j].type = "Договор заявителя"
        paragraphs_found.add("Договор заявителя")
        continue
      }
    }

    //Определение абзаца с ответом описание ДТП (6)
    if (!paragraphs_found.has("Описание ДТП")) {
      if ((current_paragraph.indexOf("результате") >= 0 &&
          (current_paragraph.indexOf("происшествия") >= 0 || current_paragraph.indexOf("ДТП") >= 0 || current_paragraph.indexOf("наезда на") >= 0) &&
          current_paragraph.indexOf("произошедшего") >= 0 &&
          current_paragraph.indexOf("трансп") >= 0) ||

          (current_paragraph.indexOf("произошло") >= 0 &&
          (current_paragraph.indexOf("происшествие") >= 0 || current_paragraph.indexOf("ДТП") >= 0) &&
          current_paragraph.indexOf("трансп") >= 0) ||

          (current_paragraph.indexOf("повреждено") >= 0 &&
          (current_paragraph.indexOf("имущество") >= 0 || current_paragraph.indexOf("ранспортное средство") >= 0))) {
        decisions[i].paragraphs[j].type = "Описание ДТП"
        paragraphs_found.add("Описание ДТП")
        continue
      }
    }

    //Определение абзаца с ответом описание ДТП (6)
    if (!paragraphs_found.has("Договор цессии")) {
      if (current_paragraph.indexOf("между") >= 0 &&
          current_paragraph.indexOf("Потребителем") >= 0 &&
          current_paragraph.indexOf("Заявителем") >= 0 &&
          current_paragraph.indexOf("заключен") >= 0 &&
          current_paragraph.indexOf("договор") >= 0 &&
          current_paragraph.indexOf("уступки") >= 0 &&
          current_paragraph.indexOf("права требования") >= 0) {
        decisions[i].paragraphs[j].type = "Договор цессии"
        paragraphs_found.add("Договор цессии")
        continue
      }
    }
  }
  return decisions
}

function paragraph_analize(paragraph) {
  let data = {}
  let start_str = []
  let end_str = []

  let right_start_index = 0
  let right_start = 999999
  let current_start = 0
  let right_end_index = 0
  let right_end = 999999
  let current_end = 0

  //Определение номера обращения
  let number = ""
  let number_paragraph = ""
  start_str.length = 0
  end_str.length = 0
  start_str[0] = "У-"
  end_str[0] = " "
  end_str[1] = "("
  
  if (paragraph.indexOf(start_str[0]) >= 0) {
    number_paragraph = paragraph.slice(paragraph.indexOf(start_str[0]))

    for (let i = 0; i < end_str.length; i++) {
      if (number_paragraph.indexOf(end_str[i]) >= 0) {
        current_end = number_paragraph.indexOf(end_str[i])
        if (current_end < right_end) {
          right_end = current_end
          right_end_index = i
        }
      }
    }
    number = number_paragraph.substr(0, number_paragraph.indexOf(end_str[right_end_index]))
  }

  if (number == "") {
    start_str.length = 0
    end_str.length = 0
    start_str[0] = "№ У"
    end_str[0] = " "
    end_str[1] = "("
    
    if (paragraph.indexOf(start_str[0]) >= 0) {
      number_paragraph = paragraph.slice(paragraph.indexOf(start_str[0]) + start_str[0].length)

      for (let i = 0; i < end_str.length; i++) {
        if (number_paragraph.indexOf(end_str[i]) >= 0) {
          current_end = number_paragraph.indexOf(end_str[i])
          if (current_end < right_end) {
            right_end = current_end
            right_end_index = i
          }
        }
      }
      number = "У-" + number_paragraph.substr(0, number_paragraph.indexOf(end_str[right_end_index]))
    }
  }
  data.number = number

  //Определение ФУ
  if (paragraph.indexOf("Климов") >= 0) {
    data.fu_name = "Климов В.В."
  } else if (paragraph.indexOf("Никитина") >= 0) {
    data.fu_name = "Максимова С.В."
  } else if (paragraph.indexOf("Максимова") >= 0) {
    data.fu_name = "Максимова С.В."
  } else if (paragraph.indexOf("Новак") >= 0) {
    data.fu_name = "Новак Д.В."
  } else if (paragraph.indexOf("Писаревский") >= 0) {
    data.fu_name = "Писаревский Е.Л."
  } else if (paragraph.indexOf("Савицкая") >= 0) {
    data.fu_name = "Савицкая Т.М."
  } else if (paragraph.indexOf("Воронин") >= 0) {
    data.fu_name = "Воронин Ю.В."
  }

  //Определение ФО
  let fo_name = ""
  let fo_name_paragraph = ""
  start_str.length = 0
  end_str.length = 0
  start_str[0] = "в отношении "
  end_str[0] = " ("
  data.fo_name = find_sign(paragraph, start_str, end_str)
  if (paragraph.indexOf(start_str[0]) >= 0) {
    fo_name_paragraph = paragraph.slice(paragraph.indexOf(start_str[0]) + start_str[0].length)
    fo_name = fo_name_paragraph.substr(0, fo_name_paragraph.indexOf(end_str[0]))
  }
  
  //Определение ИНН ФО
  let fo_inn = ""
  let fo_inn_paragraph = ""
  start_str.length = 0
  end_str.length = 0
  start_str[0] = "идентификационный номер налогоплательщика"
  start_str[1] = ": "
  end_str[0] = ")"
  if (fo_name_paragraph.indexOf(start_str[0]) >= 0) {
    fo_inn_paragraph = fo_name_paragraph.slice(fo_name_paragraph.indexOf(start_str[0]) + start_str[0].length)
    fo_inn_paragraph = fo_inn_paragraph.slice(fo_inn_paragraph.indexOf(start_str[1]) + start_str[1].length)
    fo_inn = fo_inn_paragraph.substr(0, fo_inn_paragraph.indexOf(end_str[0]))
  }
  fo_inn = fo_inn.replaceAll("финансовой организации ", "")
  data.fo_inn = fo_inn

  //Определение ФИО Заявителя
  start_str.length = 0
  end_str.length = 0
  start_str[0] = "Обращение) "
  // start_str[1] = "по результатам рассмотрения обращения "
  end_str[0] = " ("

  data.app_name = find_sign(paragraph, start_str, end_str)

  //Определение типа договора страхования
  if (paragraph.indexOf("ОСАГО") >= 0) {
    data.contract_type = "ОСАГО"
  } else if (paragraph.indexOf("КАСКО") >= 0) {
    data.contract_type = "КАСКО"
  } else if (paragraph.indexOf("добровольного страхования имущества") >= 0) {
    data.contract_type = "Страхование имущества"
  } else {
    data.contract_type = "ИНОЕ"
  }

  //Определение наличие требования о взыскании страхового возмещения
  if (paragraph.indexOf("страхового возмещения") >= 0 ||
      paragraph.indexOf("страховой выплаты") >= 0) {
    data.sv = "Страховое возмещение"
  } else if (paragraph.indexOf("недостатков") >= 0 &&
             paragraph.indexOf("недостатков") >= 0) {
    data.sv = "Качество ремонта"
  } else if (paragraph.indexOf("УТС") >= 0) {
    data.sv = "УТС"
  } 

  //Определение наличие требования о взыскании неустойки
  if (paragraph.indexOf("неустойки") >= 0) {
    data.penalty = "ДА"
  } else {
    data.penalty = "НЕТ"
  }

  //Определение наличие требования о взыскании неустойки
  if (paragraph.indexOf("без учета износа") >= 0 ||
      paragraph.indexOf("без износа") >= 0) {
    data.wear = "ДА"
  }

  return data
}

function find_sign(paragraph, start_str, end_str) {
  let text
  let text_paragraph
  let right_start_index = 0
  let right_start = 999999
  let current_start = 0
  let right_end_index = 0
  let right_end = 999999
  let current_end = 0

  for (let i = 0; i < start_str.length; i++) {
    if (paragraph.indexOf(start_str[i]) >= 0) {
      current_start = paragraph.indexOf(start_str[i])
      if (current_start < right_start) {
        right_start = current_start
        right_start_index = i
      }
    }
  }
  
  if (paragraph.indexOf(start_str[right_start_index]) >= 0) {

    //Получение вспомогательной подстроки начиная с искомой начальной подтроки
    text_paragraph = paragraph.slice(paragraph.indexOf(start_str[right_start_index]) + start_str[right_start_index].length)

    //Поиск наиболее раннего входжения конечной подстроки
    for (let i = 0; i < end_str.length; i++) {
      if (text_paragraph.indexOf(end_str[i]) >= 0) {
        current_end = text_paragraph.indexOf(end_str[i])
        if (current_end < right_end) {
          right_end = current_end
          right_end_index = i
        }
      }
    }
    //Получение искомых данных
    text = text_paragraph.substr(0, text_paragraph.indexOf(end_str[right_end_index]))
  }

  return text
}

function show_decisions(decisions) {
  const gridDiv = document.querySelector('#show_decisions_div')
  gridDiv.innerHTML = ""
  // if (!gridDiv.childNodes.length) {

      let checkboxSelection = function (params) {
          // we put checkbox on the name if we are not doing grouping
          return params.columnApi.getRowGroupColumns().length === 0;
      };
      let headerCheckboxSelection = function (params) {
          // we put checkbox on the name if we are not doing grouping
          return params.columnApi.getRowGroupColumns().length === 0;
      };

      const columnDefs = [{ field: "id",
                            checkboxSelection: checkboxSelection,
                            headerCheckboxSelection: headerCheckboxSelection, }]
      
      // columnDefs.push({ field: "Номер", })
      // columnDefs.push({ field: "Наименование ФО", })
      // columnDefs.push({ field: "ИНН ФО", })
      // columnDefs.push({ field: "ФИО Заявителя", })
      // columnDefs.push({ field: "Результат", })

      //Формирование столбцов
      let keys = new Set();
      keys.clear();
      // keys.add(1); //Добавляестя для того, чтобы первая строка не разбивалась на символы
      
      for (let i = 0; i < decisions.length; i++) {
        for (let j = 1; j < Object.keys(decisions[i].data).length; j++) {
          if (!keys.has(Object.keys(decisions[i].data)[j])) {
            keys.add(Object.keys(decisions[i].data)[j]);
          }
        }
      }
      for (let i = 0; i < decisions.length; i++) {
        for (let j = 1; j < decisions[i].paragraphs.length; j++) {
          if (decisions[i].paragraphs[j].type != "") {
            // if (!keys.has(decisions[i].paragraphs[j].type)) {
              keys.add(decisions[i].paragraphs[j].type);
            // }
          }
        }
      }

      for (const value of keys) {
        columnDefs.push({ field: String(value), })
      }
      // for (let i = 0; i < keys.size; i++) {
      //   columnDefs.push({ field: String(keys), })
      // }
      

      // for (let i = 1; i < decisions[0].paragraphs.length; i++) {
      //   if (decisions[0].paragraphs[i].type != "") {
      //     columnDefs.push({ field: decisions[0].paragraphs[i].type, })
      //   }
      // }
          
      const rowData = []

      for (let i = 0; i < decisions.length; i++) {
          let obj = {}
          obj["id"] = i + 1
          for (let j = 0; j < Object.keys(decisions[i].data).length; j++) {
            obj[Object.keys(decisions[i].data)[j]] = Object.values(decisions[i].data)[j]
          }
          for (let j = 0; j < decisions[i].paragraphs.length; j++) {
            if (decisions[i].paragraphs[j].type != "") {
              obj[decisions[i].paragraphs[j].type] = decisions[i].paragraphs[j].text
            }
          }
          // obj["Номер"] = decisions[i].number_str
          // obj["Наименование ФО"] = decisions[i].fo_name
          // obj["ИНН ФО"] = decisions[i].fo_inn
          // obj["ФИО Заявителя"] = decisions[i].app_name
          // obj["Результат"] = decisions[i].result
          
          
          rowData.push(obj)
      }

      const gridOptions = {
          columnDefs: columnDefs,
          rowData: rowData,
          pagination: true,
          // default col def properties get applied to all columns
          defaultColDef: {
              sortable: true,
              resizable: true,
              filter: true,
              flex: 1,
              minWidth: 200,
          },
          rowSelection: 'multiple', // allow rows to be selected
          animateRows: true, // have rows animate to new positions when sorted

          // example event handler
          onCellClicked: params => {
              $('#paragraph_of_the_decision').find('h5').html(params.colDef.field)
              $('#paragraph_of_the_decision').find('p').html(params.value)
              $('#paragraph_of_the_decision').modal('show')
          }
      }

      new agGrid.Grid(gridDiv, gridOptions)
  // }
  $('#show_decisions').modal('show')
}