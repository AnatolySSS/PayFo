const PizZip = require("pizzip");
const { DOMParser } = require("@xmldom/xmldom")
const XLSX = require('xlsx')
import { changeDateType } from './changeDateType.js';
import { findLastDay } from './findLastDay';
import { DATE_NEW_OSAGO_METHODOKOGY } from "./variables"

let decisions = []
let array_for_excel = []
let paragraphs = []
let time_start, time_end

export function decision_check(files) {

  time_start = Date.now()
  console.log();

  decisions.length = 0
  paragraphs.length = 0
  
    for (var i = 0; i < files.length; i++) {
      decisions[i] = {
        data: {},
        paragraphs : [],
      }
      decision_download(i, files[i], decision_analize, files.length)
    }
}

//Получение файла и чтение параграфов в массив параграфов
function decision_download(i, file, decision_analize, length) {
  let reader = new FileReader();
  reader.readAsArrayBuffer(file)
  reader.onload = function() {
    paragraphs = getParagraphs(reader.result, i, file)
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
    decision_analize(i, decisions[i].paragraphs, show_decisions, length)
  }
}

function str2xml(str) {
  if (str.charCodeAt(0) === 65279) {
      // BOM sequence
      str = str.substr(1);
  }
  return new DOMParser().parseFromString(str, "text/xml");
}

function getParagraphs(content, numb, file) {
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
              // console.log(numb);
              // console.log(file);
            }
            
          }
      }
      fullText = clearing_text(fullText)
    paragraphs.push(fullText);
  }
  return paragraphs;
}

//Текстовый анализ решения (определение параграфов)
function decision_analize (i, paragraphs, show_decisions, length) {
  
  let paragraphs_found = new Set();
  paragraphs_found.clear();
  // decisions[i].data["Количество слов"] = ""
  // decisions[i].data["Номер абзаца перехода к мотивировочной части"] = ""
  decisions[i].data["Текст решения"] = ""

  let preambula_to_description_index = 0
  let description_to_motivation_index = 0
  
  decisions[i].data["Количество переходов"] = 0
  for (let j = 0; j < paragraphs.length; j++) {
    let current_paragraph = paragraphs[j].text

    //Определение абзаца "УСТАНОВИЛ"
    if (current_paragraph == "УСТАНОВИЛ" || current_paragraph == "УСТАНОВИЛ:") {
      preambula_to_description_index = j
    }

    //Определение абзаца-перехода к мотивировочной части (4)
    if (((current_paragraph.indexOf("Рассмотрев") >= 0 &&
        (current_paragraph.indexOf("имеющиеся в деле") >= 0 || 
          current_paragraph.indexOf("содержащиеся в деле") >= 0 || 
          current_paragraph.indexOf("имеющиеся в материалах") >= 0 || 
          current_paragraph.indexOf("представленные") >= 0 || 
          current_paragraph.indexOf("предоставленные") >= 0) &&
        current_paragraph.indexOf("документы") >= 0 ||
          current_paragraph.indexOf("материалы") >= 0) ||
        
        (current_paragraph.indexOf("результатам рассмотрения") >= 0 &&
        (current_paragraph.indexOf("имеющихся в деле") >= 0 || 
          current_paragraph.indexOf("представленных") >= 0 || 
          current_paragraph.indexOf("предоставленных") >= 0) &&
        current_paragraph.indexOf("документов") >= 0)) &&
        
        current_paragraph.indexOf("полномоченны") >= 0 &&
        decisions[i].paragraphs[j].text.split(' ').length < 30) {
      decisions[i].paragraphs[j].type = "Переход к мотивировочной части"
      // decisions[i].data["Количество слов"] = decisions[i].data["Количество слов"] + " " + decisions[i].paragraphs[j].text.split(' ').length
      paragraphs_found.add("Переход к мотивировочной части")
      description_to_motivation_index = j
      decisions[i].data["Количество переходов"]++
    }
  }

  // decisions[i].data["Номер абзаца перехода к мотивировочной части"] = description_to_motivation_index
  decisions[i].data["Количество договоровов цессии"] = 0
  decisions[i].data["Количество первоначальных обращений"] = 0
  decisions[i].data["Количество претензий"] = 0
  decisions[i].data["Количество договоров страхования кроме Заявителя"] = 0
  decisions[i].data["Заявитель является собственником ТС"] = "ДА"
  decisions[i].data["Спор о собственнике ТС"] = "НЕТ"
  decisions[i].data["Европротокол"] = "НЕТ"
  decisions[i].data["Количество осмотров ФО"] = 0
  decisions[i].data["Такси"] = "НЕТ"
  decisions[i].data["Грузовое ТС"] = "НЕТ"

  for (let j = 0; j < paragraphs.length; j++) {
    let current_paragraph = paragraphs[j].text

     //Получение текст описательной части
     if (j > preambula_to_description_index && j <= description_to_motivation_index) {
      decisions[i].data["Текст решения"] = decisions[i].data["Текст решения"] + '<hr>' + j + '<hr>' + current_paragraph
    }
    
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
        decisions[i].data["Дата обращения к ФУ"] = paragraph_analize(current_paragraph, decisions[i].paragraphs[j].type).date_appeal
        decisions[i].data["ФУ"] = paragraph_analize(current_paragraph).fu_name
        decisions[i].data["Наименование ФО"] = paragraph_analize(current_paragraph).fo_name
        decisions[i].data["ИНН ФО"] = paragraph_analize(current_paragraph).fo_inn
        decisions[i].data["ФИО Заявителя"] = paragraph_analize(current_paragraph).app_name
        decisions[i].data["Тип Заявителя"] = paragraph_analize(current_paragraph).app_type
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
      if ((current_paragraph.indexOf("предостав") >= 0 || current_paragraph.indexOf("представ") >= 0) &&
          current_paragraph.indexOf("документы") >= 0 &&

          current_paragraph.indexOf("растор") == -1 &&
          current_paragraph.indexOf("Заявит") == -1) {
        decisions[i].paragraphs[j].type = "Ответ фо на запрос фу"
        decisions[i].data["ФО предоставлены документы по запросу ФУ"] = paragraph_analize(current_paragraph, decisions[i].paragraphs[j].type).fo_docs_answer
        paragraphs_found.add("Ответ фо на запрос фу")
        continue
      }
    }

    //Определение абзаца с договором заявителя (5)
    let app_contract_paragraph_index = 0
    if (!paragraphs_found.has("Договор заявителя") && j < description_to_motivation_index) {
      if ((((current_paragraph.indexOf("Между") >= 0 || current_paragraph.indexOf("между") >= 0) &&
          (current_paragraph.indexOf("аявителем") >= 0 || current_paragraph.indexOf("отребител") >= 0 || current_paragraph.indexOf("отерпевшим") >= 0 || current_paragraph.indexOf("едентом") >= 0) &&
          current_paragraph.indexOf("заключен") >= 0 &&
          current_paragraph.indexOf("оговор") >= 0) ||
          
          (current_paragraph.indexOf("ражданская ответственность") >= 0 &&
          (current_paragraph.indexOf("аявителя") >= 0 || current_paragraph.indexOf("отребителя") >= 0 || current_paragraph.indexOf("отерпевшего") >= 0 || current_paragraph.indexOf("едента") >= 0) &&
          current_paragraph.indexOf("застрахована") >= 0) ||
          
          ((current_paragraph.indexOf("Сведени") >= 0 || current_paragraph.indexOf("сведени") >= 0) &&
          current_paragraph.indexOf("страховании гражданской ответственности") >= 0 &&
          (current_paragraph.indexOf("аявителя") >= 0 || current_paragraph.indexOf("отребителя") >= 0 || current_paragraph.indexOf("отерпевшего") >= 0 || current_paragraph.indexOf("едента") >= 0) &&
          (current_paragraph.indexOf("не имеется") >= 0 || current_paragraph.indexOf("не предоставлено") >= 0)) ||

          ((current_paragraph.indexOf("Сведени") >= 0 || current_paragraph.indexOf("сведени") >= 0) &&
          current_paragraph.indexOf("заключении") >= 0 &&
          (current_paragraph.indexOf("аявителем") >= 0 || current_paragraph.indexOf("отребител") >= 0 || current_paragraph.indexOf("отерпевшим") >= 0 || current_paragraph.indexOf("едентом") >= 0) &&
          current_paragraph.indexOf("договора") >= 0 &&
          (current_paragraph.indexOf("не имеется") >= 0 || current_paragraph.indexOf("не предоставлено") >= 0))) &&
          
          current_paragraph.indexOf("цессии") == -1 &&
          current_paragraph.indexOf("оглашение, заключенное между Заявителем и") == -1 &&
          current_paragraph.indexOf("уступк") == -1 &&
          current_paragraph.indexOf("аким образом") == -1) {
        decisions[i].paragraphs[j].type = "Договор заявителя"
        paragraphs_found.add("Договор заявителя")
        app_contract_paragraph_index = j
        continue
      }
    }

    //Определение абзаца с договорами страхования кроме заявителя (6)
    if (j != app_contract_paragraph_index && j < description_to_motivation_index) {
      if (((current_paragraph.indexOf("ражданская ответственность") >= 0 &&
          (current_paragraph.indexOf("была") >= 0 || current_paragraph.indexOf("застрахована") >= 0) &&
          (current_paragraph.indexOf("в рамках") >= 0 || current_paragraph.indexOf(" по ") >= 0) &&
          current_paragraph.indexOf("оговор") >= 0) ||
          
          ((current_paragraph.indexOf("Между") >= 0 || current_paragraph.indexOf("между") >= 0) &&
          current_paragraph.indexOf("заключен") >= 0 &&
          current_paragraph.indexOf("оговор") >= 0) ||
          
          ((current_paragraph.indexOf("Сведени") >= 0 || current_paragraph.indexOf("сведени") >= 0) &&
          current_paragraph.indexOf("страховании гражданской ответственности") >= 0 &&
          (current_paragraph.indexOf("не имеется") >= 0 || current_paragraph.indexOf("не предоставлено") >= 0)) ||

          ((current_paragraph.indexOf("Сведени") >= 0 || current_paragraph.indexOf("сведени") >= 0) &&
          current_paragraph.indexOf("заключении договора страхования") >= 0 &&
          (current_paragraph.indexOf("не имеется") >= 0 || current_paragraph.indexOf("не предоставлено") >= 0))) &&
          
          current_paragraph.indexOf("между Заявителем и") == -1 &&
          current_paragraph.indexOf("ражданская ответственность Заявителя") == -1 &&
          current_paragraph.indexOf("отребитель") == -1 &&
          current_paragraph.indexOf("цессии") == -1 &&
          current_paragraph.indexOf("отказа") == -1 &&
          current_paragraph.indexOf("оглашение, заключенное между Заявителем и") == -1 &&
          current_paragraph.indexOf("уступк") == -1 &&
          current_paragraph.indexOf("о передаче портфеля") == -1 &&
          current_paragraph.indexOf("аким образом") == -1) {
        decisions[i].paragraphs[j].type = "Договоры страхования кроме Заявителя"
        decisions[i].data["Количество договоров страхования кроме Заявителя"]++
        continue
      }
    }
    
    //Определение абзаца с описанием ДТП (7)
    if (!paragraphs_found.has("Описание ДТП") && j < description_to_motivation_index) {
      if ((current_paragraph.indexOf("результате") >= 0 &&
          (current_paragraph.indexOf("происшествия") >= 0 || current_paragraph.indexOf("ДТП") >= 0 || current_paragraph.indexOf("наезда на") >= 0) &&
          (current_paragraph.indexOf("произошедшего") >= 0 || current_paragraph.indexOf("вследствие действий") >= 0) &&
          (current_paragraph.indexOf("трансп") >= 0 || current_paragraph.indexOf("Трансп") >= 0)) ||

          (current_paragraph.indexOf("произошло") >= 0 &&
          (current_paragraph.indexOf("происшествие") >= 0 || current_paragraph.indexOf("ДТП") >= 0) &&
          current_paragraph.indexOf("трансп") >= 0) ||

          (current_paragraph.indexOf("совершил") >= 0 &&
          current_paragraph.indexOf("столкновение") >= 0) ||

          ((current_paragraph.indexOf("совершил") >= 0 || current_paragraph.indexOf("произош") >= 0) &&
          current_paragraph.indexOf("наезд") >= 0) ||

          ((current_paragraph.indexOf("механическое повреждение") >= 0) &&
          current_paragraph.indexOf("имущества") >= 0) ||

          ((current_paragraph.indexOf("механическое повреждение") >= 0) &&
          current_paragraph.indexOf("имущества") >= 0) ||

          (current_paragraph.indexOf("повреждено") >= 0 &&
          (current_paragraph.indexOf("имущество") >= 0 || current_paragraph.indexOf("ранспортное средство") >= 0))) {
        decisions[i].paragraphs[j].type = "Описание ДТП"
        paragraphs_found.add("Описание ДТП")
        decisions[i].data["Вред причинен"] = paragraph_analize(current_paragraph, decisions[i].paragraphs[j].type).damage
        decisions[i].data["Вред причинен (абзац)"] = paragraph_analize(current_paragraph, decisions[i].paragraphs[j].type).damage_paragraph
        decisions[i].data["Статус Заявителя"] = paragraph_analize(current_paragraph, decisions[i].paragraphs[j].type).app_status
        decisions[i].data["Дата ДТП"] = paragraph_analize(current_paragraph, decisions[i].paragraphs[j].type).dtp_date
        decisions[i].data["ДТП произошло после 20/09/2021"] = paragraph_analize(current_paragraph, decisions[i].paragraphs[j].type).dtp_date_after
        decisions[i].data["Виновник ДТП"] = paragraph_analize(current_paragraph, decisions[i].paragraphs[j].type).dtp_culpit_name
        decisions[i].data["Единственный виновник ДТП"] = paragraph_analize(current_paragraph, decisions[i].paragraphs[j].type).dtp_culpit_only_one
        decisions[i].data["Виновник ДТП установлен"] = paragraph_analize(current_paragraph, decisions[i].paragraphs[j].type).dtp_culpit_determined
        decisions[i].data["Заявитель является виновником ДТП"] = paragraph_analize(current_paragraph, decisions[i].paragraphs[j].type).app_is_culpit
        continue
      }
    }

    //Определение абзацев с договором цессии (8)
    if (j < description_to_motivation_index) {
      if (current_paragraph.indexOf("между") >= 0 &&
          current_paragraph.indexOf("заключен") >= 0 &&
          (current_paragraph.indexOf("оговор") >= 0 || current_paragraph.indexOf("оглашени") >= 0) &&
          (current_paragraph.indexOf("уступк") >= 0 || current_paragraph.indexOf("цессии") >= 0) &&
          
          current_paragraph.indexOf("редоставленный") == -1 &&
          current_paragraph.indexOf("растор") == -1 &&
          current_paragraph.indexOf("аправил") == -1 &&
          current_paragraph.indexOf("претензи") == -1 &&
          current_paragraph.indexOf("аким образом") == -1 &&
          current_paragraph.indexOf("оскольку") == -1 &&
          current_paragraph.indexOf("обратил") == -1 &&
          current_paragraph.indexOf("решение суда") == -1) {
        decisions[i].paragraphs[j].type = "Договор цессии"
        if (decisions[i].data["Статус Заявителя"] == "") {
          decisions[i].data["Статус Заявителя"] = "Цессионарий"
        }
        decisions[i].data["Количество договоровов цессии"]++
        continue
      }
    }

    //Определение абзацев с первоначальный обращением (8)
    if (j < description_to_motivation_index) {
      if ((current_paragraph.indexOf("обратил") >= 0 ||
            current_paragraph.indexOf("обращ") >= 0 ||
            current_paragraph.indexOf("получ") >= 0 ||
            current_paragraph.indexOf("оступил") >= 0) &&

          (current_paragraph.indexOf("прямом возмещении") >= 0 || 
            current_paragraph.indexOf("наступлении страхового") >= 0 || 
            current_paragraph.indexOf("выплате страхового возмещения") >= 0 || 
            current_paragraph.indexOf("страховом случае") >= 0 || 
            current_paragraph.indexOf("страхового события") >= 0 || 
            current_paragraph.indexOf("возмещении убытков") >= 0 || 
            current_paragraph.indexOf("наступлении события, имеющего признаки страхового случая") >= 0 || 
            current_paragraph.indexOf("страховом возмещении") >= 0) &&
          
          current_paragraph.indexOf("претенз") == -1 &&
          current_paragraph.indexOf("требовани") == -1 &&
          current_paragraph.indexOf("растор") == -1 &&
          current_paragraph.indexOf("акие повреждения") == -1 &&
          current_paragraph.indexOf("огласно абзацу") == -1 &&
          current_paragraph.indexOf("выдать") == -1) {
        decisions[i].paragraphs[j].type = "Первоначальное обращение"
        if (decisions[i].paragraphs[j].text.indexOf(decisions[i].data["Наименование ФО"]) >=0 || (decisions[i].paragraphs[j].text.indexOf("инансов") >=0 && decisions[i].paragraphs[j].text.indexOf("рганизаци") >=0)) {
          if (decisions[i].data["Дата первоначального обращения в ФО"] == undefined) {
            decisions[i].data["Дата первоначального обращения в ФО"] = paragraph_analize(current_paragraph, decisions[i].paragraphs[j].type).app_first_date
          }
        }
        decisions[i].data["Количество первоначальных обращений"]++
        // paragraphs_found.add("Первоначальное обращение")
        continue
      }
    }

    //Определение абзацев с выбранной формой страхового возмещения (8)
    if (j < description_to_motivation_index) {
      if (current_paragraph.indexOf("выбрана форма выплаты страхового возмещения – путем перечисления денежных средств") >= 0) {
        decisions[i].paragraphs[j].type = "Форма страхового возмещения (абзац)"
        decisions[i].data["Форма страхового возмещения"] = "Выплата денежных средств"
        continue
      } else if (current_paragraph.indexOf("выбрана форма выплаты страхового возмещения – путем организации и оплаты стоимости восстановительного ремонта на СТОА, с которой у Финансовой") >= 0) {
        decisions[i].paragraphs[j].type = "Форма страхового возмещения (абзац)"
        decisions[i].data["Форма страхового возмещения"] = "Ремонт на СТОА по выбору ФО"
      } else if (current_paragraph.indexOf("выбрана форма выплаты страхового возмещения – путем организации и оплаты стоимости восстановительного ремонта на СТОА, выбранной Заявителем") >= 0) {
        decisions[i].paragraphs[j].type = "Форма страхового возмещения (абзац)"
        decisions[i].data["Форма страхового возмещения"] = "Ремонт на СТОА по выбору Заявителя"
      } else {
        decisions[i].data["Форма страхового возмещения"] = "Не выбрана"
      }
    }

    //Определение абзацев с осмотром ТС ФО (8)
    if (j < description_to_motivation_index) {
      if (current_paragraph.indexOf("осмотр") >= 0 &&
          ((current_paragraph.indexOf("прове") >= 0 || current_paragraph.indexOf("произ") >= 0 || current_paragraph.indexOf("осуществ") >= 0 || current_paragraph.indexOf("организо") >= 0 || current_paragraph.indexOf(" для ") >= 0 || current_paragraph.indexOf(" на ") >= 0) ||
          // (((current_paragraph.indexOf("инансов") >= 0 && current_paragraph.indexOf("организаци") >= 0 || 
          //   current_paragraph.indexOf(decisions[i].data["Наименование ФО"]) >= 0)) ||
          (current_paragraph.indexOf(" не ") >= 0 && 
          (current_paragraph.indexOf("было") >= 0 || current_paragraph.indexOf("предоставлен") >= 0 || current_paragraph.indexOf("представлен") >= 0))) &&
          
          current_paragraph.indexOf("экспертиз") == -1 &&
          current_paragraph.indexOf("заключение") == -1 &&
          current_paragraph.indexOf("инансовы") == -1 &&
          current_paragraph.indexOf("полномоченны") == -1 &&
          current_paragraph.indexOf("предстрахов") == -1 &&
          current_paragraph.indexOf("обратил") == -1 &&
          current_paragraph.indexOf("уведом") == -1 &&
          current_paragraph.indexOf("телеграмм") == -1 &&
          current_paragraph.indexOf("заявлени") == -1 &&
          current_paragraph.indexOf("претензи") == -1 &&
          current_paragraph.indexOf("оплат") == -1 &&
          current_paragraph.indexOf("выплат") == -1 &&
          current_paragraph.indexOf("транспортно-трасологическо") == -1) {
        decisions[i].paragraphs[j].type = "Осмотр ФО (абзацы)"
        decisions[i].data["Проведение осмотра ТС ФО"] = "ДА"
        if (current_paragraph.indexOf(" не ") >= 0) {
          decisions[i].data["Проведение осмотра ТС ФО"] = ""
        }
        decisions[i].data["Количество осмотров ФО"]++
        continue
      }
    }

    //Определение абзацев с упоминанием такси (9)
    if (current_paragraph.indexOf("такси") >= 0) {
      decisions[i].paragraphs[j].type = "Такси (абзацы)"
      decisions[i].data["Такси"] = paragraph_analize(current_paragraph).taxi
      continue
    }

    //Определение абзацев с упоминанием грузовое ТС (10)
    if (current_paragraph.indexOf("грузов") >= 0) {
      decisions[i].paragraphs[j].type = "Грузовое ТС (абзацы)"
      decisions[i].data["Грузовое ТС"] = paragraph_analize(current_paragraph).cargo
      continue
    }

    //Определение абзацев с упоминанием собственника ТС (11)
    if (current_paragraph.indexOf("собственником") >= 0) {
      decisions[i].paragraphs[j].type = "Собственник (абзацы)"
      decisions[i].data["Спор о собственнике ТС"] = "ДА"
      if (decisions[i].data["Результат"] == "ПРЕКРАТИТЬ") {
        decisions[i].data["Заявитель является собственником ТС"] = "НЕТ"
      }
      continue
    }

    //Определение абзацев с упоминанием европротокола (10)
    if (j < description_to_motivation_index) {
      if (current_paragraph.indexOf("европротокол") >= 0 || 

          (current_paragraph.indexOf("без участия") >= 0 && 
          current_paragraph.indexOf("сотрудников") >= 0 && 
          (current_paragraph.indexOf("полиции") >= 0 || current_paragraph.indexOf("ГИБДД") >= 0))) {
        decisions[i].paragraphs[j].type = "Европротокол (абзацы)"
        decisions[i].data["Европротокол"] = paragraph_analize(current_paragraph, decisions[i].paragraphs[j].type).europrotocol
        continue
      }
    }
  }

  if (decisions[i].data["Количество договоровов цессии"] > 0) {
    decisions[i].data["Заявитель является собственником ТС"] = "НЕТ"
  }

  //Алгоритм для определения номера абзаца с первоначальным обращением и удаления повторяющихся абзацев с первоначальным обращением в ФО
  let firts_app_date = ""
  let firts_app_date_paragraph_number = 0
  if (decisions[i].data["Количество первоначальных обращений"] > 1) {
    for (let j = 0; j < decisions[i].paragraphs.length; j++) {
      if (decisions[i].paragraphs[j].type == "Первоначальное обращение") {
        firts_app_date = decisions[i].paragraphs[j].text.substr(0, 10)
        firts_app_date_paragraph_number = j
        break
      }
    }
    for (let j = firts_app_date_paragraph_number + 1; j < decisions[i].paragraphs.length; j++) {
      if (decisions[i].paragraphs[j].type == "Первоначальное обращение") {
        if (!isNaN(Date.parse(changeDateType(firts_app_date)))) {
          if (decisions[i].paragraphs[j].text.indexOf(firts_app_date) >= 0) {
            decisions[i].paragraphs[j].type = ""
            decisions[i].data["Количество первоначальных обращений"]--
          }
        }
      }
    }
  } else if (decisions[i].data["Количество первоначальных обращений"] == 1) {
    for (let j = 0; j < decisions[i].paragraphs.length; j++) {
      if (decisions[i].paragraphs[j].type == "Первоначальное обращение") {
        firts_app_date_paragraph_number = j
        break
      }
    }
  }

  //Определение абзацев с претензиями (8)
  for (let j = 0; j < paragraphs.length; j++) {
    let current_paragraph = paragraphs[j].text
    if (j < description_to_motivation_index && j > firts_app_date_paragraph_number && firts_app_date_paragraph_number != 0) {
      if ((current_paragraph.indexOf("обратил") >= 0 ||
            current_paragraph.indexOf("обращ") >= 0 ||
            current_paragraph.indexOf("получ") >= 0 ||
            current_paragraph.indexOf("подал") >= 0 ||
            current_paragraph.indexOf("направ") >= 0 ||
            current_paragraph.indexOf("оступил") >= 0) &&

          (current_paragraph.indexOf("ретенз") >= 0 || 
            current_paragraph.indexOf("аявлени") >= 0) &&

            current_paragraph.indexOf("40-ФЗ") == -1 &&
            current_paragraph.indexOf("123-ФЗ") == -1 &&
            current_paragraph.indexOf("40-ФЗ") == -1 &&
            current_paragraph.indexOf("об отсутствии правовых оснований для удовлетворения") == -1) {
        decisions[i].paragraphs[j].type = "Претензия (абзацы)"
        decisions[i].data["Соблюдение претензионного порядка Заявителем"] = "ДА"
        decisions[i].data["Количество претензий"]++
      }
    }
  }
  if (decisions[i].data['Соблюдение претензионного порядка Заявителем'] == undefined) {
    decisions[i].data['Соблюдение претензионного порядка Заявителем'] = "НЕТ"
  }

  //Проверка 3-летнего срока на обращения к ФУ
  if (decisions[i].data["Основное требование"] != "Неустойка") {
    if (decisions[i].data["Дата обращения к ФУ"] != undefined && decisions[i].data["Дата первоначального обращения в ФО"] != undefined) {
      if (!isNaN(Date.parse(changeDateType(decisions[i].data["Дата обращения к ФУ"]))) && !isNaN(Date.parse(changeDateType(decisions[i].data["Дата первоначального обращения в ФО"])))) {
        let date_appeal = decisions[i].data["Дата обращения к ФУ"]
        date_appeal = changeDateType(date_appeal)
        date_appeal = Date.parse(date_appeal + 'T00:00:00')
        let last_day_for_pay_fu = new Date(findLastDay(decisions[i].data["Дата первоначального обращения в ФО"]))
        let year = last_day_for_pay_fu.getFullYear()
        let month = last_day_for_pay_fu.getMonth()
        let day = last_day_for_pay_fu.getDate()
        let last_day_for_fu_app = new Date(year + 3, month, day + 1, 0);
        last_day_for_fu_app = Date.parse(last_day_for_fu_app)
        if (date_appeal > last_day_for_fu_app) {
          decisions[i].data['Срок для обращения к ФУ пропущен'] = "ДА"
        } else if (date_appeal <= last_day_for_fu_app) {
          decisions[i].data['Срок для обращения к ФУ пропущен'] = "НЕТ"
        }
      }
    }
  }
  
  if (decisions[i].data['Срок для обращения к ФУ пропущен'] == undefined) {
    decisions[i].data['Срок для обращения к ФУ пропущен'] = "Не определено"
  }

  //Посторный проход по абзацам для определения признаков
  for (let j = 0; j < paragraphs.length; j++) {

    if (decisions[i].paragraphs[j].type == "Договоры страхования кроме Заявителя") {
      //Застрахована ответственность виновника или нет
      //Убираем точки из параграфа и виновника, т.к. после второго инициала из забывают проставлять
      let paragraph_helper = decisions[i].paragraphs[j].text.replaceAll(".", "")
      let culpit_helper = (decisions[i].data["Виновник ДТП"] != undefined) ? decisions[i].data["Виновник ДТП"].replaceAll(".", "") : decisions[i].data["Виновник ДТП"]
      if (paragraph_helper.indexOf(culpit_helper) >= 0 &&
          decisions[i].paragraphs[j].text.indexOf("не была") >= -1 &&
          decisions[i].paragraphs[j].text.indexOf("не имеется") >= -1) {
        decisions[i].data["ГО виновника застрахована"] = "ДА"
        break
      } else {
        decisions[i].data["ГО виновника застрахована"] = "НЕТ"
      }
    }
    //Указания статуса Заявителя как не определено
    if (decisions[i].data["Статус Заявителя"] == "" || decisions[i].data["Статус Заявителя"] == undefined) {
      decisions[i].data["Статус Заявителя"] = "Не определено"
    }
    //Указание является ли Заявитель виновником как не определено
    if (decisions[i].data["Заявитель является виновником ДТП"] == undefined) {
      decisions[i].data["Заявитель является виновником ДТП"] = "Не определено"
    }
  }

  // console.log((i + 1) + " из " + length + "(" + Math.round((i+1)/length*100) + "%)");
  $('#btn_fu_decision_analyze').html('Проанализировано ' + (i + 1) + " из " + length + " (" + Math.round((i+1)/length*100) + "%)")
  
  //Показать таблицу с решениями только после проверки последнего решения
  if (i == length - 1) {
    time_end = Date.now()
    $('#btn_fu_decision_analyze').html("Проанализировано " + (i + 1) + " из " + length + " (" + Math.round((i+1)/length*100) + "%) за " + Math.floor((time_end - time_start) / 1000) + " сек.")
    console.log(decisions)
  }
}

//Текстовый анализ решения (определение признаков)
function paragraph_analize(paragraph, paragraph_type) {
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

  //Определение даты обращения
  if (paragraph_type == "Преамбула") {
    let date_appeal = ""
    start_str.length = 0
    end_str.length = 0
    start_str[0] = " от "
    end_str[0] = " "
    end_str[1] = ","
    end_str[2] = "№"

    date_appeal = find_sign(paragraph, start_str, end_str)
    if (date_appeal == undefined) {
      date_appeal = ""
    }
    if (!isNaN(Date.parse(changeDateType(date_appeal)))) {
      data.date_appeal = date_appeal
    }
  }

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
  end_str[1] = " место"
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
  let app_name = ""
  start_str.length = 0
  end_str.length = 0
  start_str[0] = "Обращение) "
  end_str[0] = " ("
  end_str[1] = "("

  app_name = find_sign(paragraph, start_str, end_str)

  if (app_name == undefined) {
    start_str[0] = "Обращение), "
    end_str[0] = " ("
    end_str[1] = "("

    app_name = find_sign(paragraph, start_str, end_str)
  }

  if (app_name != undefined) {
    if (app_name.indexOf("в отношении") >= 0) {
      start_str.length = 0
      end_str.length = 0
      start_str[0] = "по результатам рассмотрения обращения "
      end_str[0] = " ("
      end_str[1] = "("

      app_name = find_sign(paragraph, start_str, end_str)
    }
    app_name = app_name.replaceAll('Индивидуального предпринимателя', 'ИП')
    data.app_name = app_name

    //Определение статуса Заявителя
    if (app_name.split(" ")[0] == "ИП") {
      data.app_type = "ИП"
    } else if (app_name.split(" ")[0] == "ООО" || app_name.indexOf("«") >= 0) {
      data.app_type = "ЮЛ"
    } else {
      data.app_type = "ФЛ"
    }
  }

  //Определение типа договора страхования
  if (paragraph.indexOf("ОСАГО") >= 0) {
    data.contract_type = "ОСАГО"
  } else if (paragraph.indexOf("КАСКО") >= 0 || paragraph.indexOf("добровольного страхования транспорт") >= 0) {
    data.contract_type = "КАСКО"
  } else if (paragraph.indexOf("добровольного страхования имущества") >= 0) {
    data.contract_type = "Страхование имущества"
  } else if (paragraph.indexOf("пассажиров от несчастных случаев") >= 0) {
    data.contract_type = "Страхование пассажиров от несчастных случаев"
  } else {
    data.contract_type = "ИНОЕ"
  }

  //Определение поврежденного имущества, здоровья или жизни
  //Определение подстроки с описанием того, чему причинен вред
  if (paragraph_type == "Описание ДТП") {
    let damage_paragraph = ""
    start_str.length = 0
    end_str.length = 0
    start_str[0] = "вред"
    start_str[1] = "ущерб"
    start_str[2] = "поврежд"
    start_str[3] = "в результате чего"
    end_str[0] = ""
    damage_paragraph = find_sign(paragraph, start_str, end_str, true)
    data.damage_paragraph = damage_paragraph

    if (damage_paragraph != undefined) {
      if (damage_paragraph.indexOf("ранспортному средству") >= 0 || damage_paragraph.indexOf("ранспортное средство") >= 0) {
        data.damage = "ТС"
      } else if (damage_paragraph.indexOf("имущ") >= 0) {
        data.damage = "ИМУЩЕСТВО"
      } else if (damage_paragraph.indexOf("мотоцикл") >= 0) {
        data.damage = "МОТОЦИКЛ"
      } else if (damage_paragraph.indexOf("велосипед") >= 0) {
        data.damage = "ВЕЛОСИПЕД"
      } else if (damage_paragraph.indexOf("здоров") >= 0) {
        data.damage = "ЗДОРОВЬЕ"
      } else if (damage_paragraph.indexOf("жизн") >= 0 || damage_paragraph.indexOf("смерт") >= 0) {
        data.damage = "ЖИЗНЬ"
      } else {
        data.damage = "ИНОЕ"
      }

      //Определение статиуса Заявителя
      if (damage_paragraph.indexOf("Заявител") >= 0 || damage_paragraph.indexOf("заявител") >= 0) {
        data.app_status = "Потребитель"
      } else {
        data.app_status = ""
      }
    } else {
      data.app_status = ""
    }
  }

  //Определение наличие требования о взыскании страхового возмещения
  if (paragraph.indexOf("недостатков") >= 0 &&
      paragraph.indexOf("недостатков") >= 0) {
    data.sv = "Качество ремонта"
  } else if (paragraph.indexOf("страхового возмещения") >= 0 || paragraph.indexOf("страховой выплаты") >= 0) {
    if (paragraph.indexOf("неустойк") >=0) {
      if (paragraph.indexOf("неустойки") > paragraph.indexOf("страхов")) {
        data.sv = "Страховое возмещение"
      } else {
        data.sv = "Неустойка"
      }
    } else {
      data.sv = "Страховое возмещение"
    }
  } else if (paragraph.indexOf("УТС") >= 0) {
    data.sv = "УТС"
  } else if (paragraph.indexOf("неустойк") >= 0) {
    data.sv = "Неустойка"
  } else if (paragraph.indexOf("расход") >= 0) {
    data.sv = "Расходы"
  }

  //Определение предоставлены ФО документы или нет 
  if (paragraph_type == "Ответ фо на запрос фу") {
    if (paragraph.indexOf(" не ") >= 0) {
      data.fo_docs_answer = "НЕТ"
    } else {
      data.fo_docs_answer = "ДА"
    }
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

  //Определение основания для прекращения (такси)
  if (paragraph.indexOf("такси") >= 0) {
    data.taxi = "ДА"
  } else {
    data.taxi = "НЕТ"
  }

  //Определение основания для прекращения (грузовое ТС)
  if (paragraph.indexOf("грузов") >= 0) {
    data.cargo = "ДА"
  } else {
    data.cargo = "НЕТ"
  }

  //Определение европротокола
  if (paragraph_type == "Европротокол (абзацы)") {
    data.europrotocol = "ДА"
  } else {
    data.europrotocol = "НЕТ"
  }

  //Определение даты ДТП
  if (paragraph_type == "Описание ДТП") {
    let dtp_date = ""
    start_str.length = 0
    end_str.length = 0
    start_str[0] = "произошедшего "
    start_str[1] = "установлено, что "
    end_str[0] = " "
    end_str[1] = ","
    end_str[2] = "("

    dtp_date = find_sign(paragraph, start_str, end_str)

    if (dtp_date == undefined || isNaN(Date.parse(changeDateType(dtp_date)))) {
      start_str.length = 0
      end_str.length = 0
      start_str[0] = "дорожно-транспортного происшествия от "
      start_str[1] = "ДТП от "
      start_str[2] = "ДТП) от "
      end_str[0] = " "
      end_str[1] = ","
      end_str[2] = "("
      dtp_date = find_sign(paragraph, start_str, end_str)
    }

    if (dtp_date == undefined || isNaN(Date.parse(changeDateType(dtp_date)))) {
      dtp_date = paragraph.substr(0, 10)
    }

    if (dtp_date == undefined) {
      dtp_date = ""
    }
    
    if (!isNaN(Date.parse(changeDateType(dtp_date)))) {
      // data.dtp_date = dtp_date
      if (Date.parse(changeDateType(dtp_date) + 'T00:00:00') > DATE_NEW_OSAGO_METHODOKOGY) {
        data.dtp_date_after = "ДА"
      } else {
        data.dtp_date_after = "НЕТ"
      }
      data.dtp_date = dtp_date
    }
  }

  //Определение виновника ДТП
  if (paragraph_type == "Описание ДТП") {
    let dtp_culpit_name = ""
    start_str.length = 0
    end_str.length = 0
    start_str[0] = "вследствие действий "
    end_str[0] = ","

    dtp_culpit_name = find_sign(paragraph, start_str, end_str)
    
    if (dtp_culpit_name != undefined) {
      dtp_culpit_name = dtp_culpit_name.replaceAll('водителя ', '')
      data.dtp_culpit_only_one= "ДА"
      data.dtp_culpit_determined = "ДА"

      if (dtp_culpit_name.indexOf("аявител") >= 0) {
        data.app_is_culpit = "ДА"
      } else {
        data.app_is_culpit = "НЕТ"
      }
    } else {
      data.app_is_culpit = "Не определено"
    }
    data.dtp_culpit_name = dtp_culpit_name
  }

  //Определение даты первоначального обращения в ФО
  if (paragraph_type == "Первоначальное обращение") {
    let app_first_date = ""

    app_first_date = paragraph.substr(0, 10)

    if (app_first_date == undefined) {
      app_first_date = ""
    }
    
    if (!isNaN(Date.parse(changeDateType(app_first_date)))) {
      data.app_first_date = app_first_date
    }
  }
  
  return data
}

//Получение максимально близкого вхождения окончания строки
function find_sign(paragraph, start_str, end_str, end_none) {
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

    //Получение вспомогательной подстроки начиная с искомой начальной подтроки до конца строки
    text_paragraph = paragraph.slice(paragraph.indexOf(start_str[right_start_index]) + start_str[right_start_index].length)
    text = text_paragraph

    //Если поиск конечной точки осуществляется
    if (!end_none) {
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
  }
  
  return text
}

//Показать все найденные значения в таблице
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

      //Формирование столбцов
      let keys = new Set();
      keys.clear();
      
      //Добавление столбцов для данных
      for (let i = 0; i < decisions.length; i++) {
        for (let j = 0; j < Object.keys(decisions[i].data).length; j++) {
          keys.add(Object.keys(decisions[i].data)[j]);
        }
      }
      //Добавление столбцов для параграфов
      for (let i = 0; i < decisions.length; i++) {
        for (let j = 1; j < decisions[i].paragraphs.length; j++) {
          if (decisions[i].paragraphs[j].type != "") {
            keys.add(decisions[i].paragraphs[j].type);
          }
        }
      }
      
      for (const value of keys) {
        columnDefs.push({ field: String(value), })
      }

      const rowData = []

      for (let i = 0; i < decisions.length; i++) {
        let obj = {}
        obj["id"] = i + 1

        //Добавление признаков
        for (let j = 0; j < Object.keys(decisions[i].data).length; j++) {
          obj[Object.keys(decisions[i].data)[j]] = Object.values(decisions[i].data)[j]
        }

        //Добавление абзацев
        for (let j = 0; j < decisions[i].paragraphs.length; j++) {
          if (decisions[i].paragraphs[j].type != "") {
            if (obj[decisions[i].paragraphs[j].type] == undefined) {
              obj[decisions[i].paragraphs[j].type] = decisions[i].paragraphs[j].text
            } else {
              obj[decisions[i].paragraphs[j].type] = obj[decisions[i].paragraphs[j].type] + '<hr>' + decisions[i].paragraphs[j].text
            }
            
          }
        }
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

//Очищение текста от лишних символов
function clearing_text(text) {
  let new_text = ""
  new_text = text.trim()
  new_text = new_text.replaceAll(/(?=\s)[^\r\n\t]/g, ' ')
  new_text = new_text.replaceAll('‑', '-')
  new_text = new_text.replaceAll('‒', '-')
  new_text = new_text.replaceAll('–', '-')
  new_text = new_text.replaceAll('—', '-')
  new_text = new_text.replaceAll(' - ', ' – ')
  return new_text
}

document.getElementById('btn_fu_decision_show').onclick = function (){
  show_decisions(decisions)
}

document.getElementById('btn_fu_decision_download').onclick = function (){
  //Заполнение файла для выгрузки в excel
  for (let k = 0; k < decisions.length; k++) {
    array_for_excel.push(decisions[k].data)
    for (let j = 0; j < decisions[k].paragraphs.length; j++) {
      if (decisions[k].paragraphs[j].type != "") {
        try {
          if (array_for_excel[k][decisions[k].paragraphs[j].type] == undefined) {
            array_for_excel[k][decisions[k].paragraphs[j].type] = decisions[k].paragraphs[j].text
          } else {
            array_for_excel[k][decisions[k].paragraphs[j].type] = array_for_excel[k][decisions[k].paragraphs[j].type] + '\n\n' + decisions[k].paragraphs[j].text
          }
          // array_for_excel[k][decisions[k].paragraphs[j].type] = decisions[k].paragraphs[j].text
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  
  const worksheet = XLSX.utils.json_to_sheet(array_for_excel);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Decisions");
  XLSX.writeFile(workbook, "Decisions.xlsx", { compression: true });
}