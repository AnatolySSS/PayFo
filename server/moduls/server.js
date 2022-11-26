const XLSX = require('xlsx')
var enterprise = require("@ag-grid-enterprise/core");
import { check_signs } from "./motivations/motivation";
// let data_from_db_main = {}

//Получает данные из таблицы с мотивировками и формирует объект, с полями (все признаки)
export function objToJSON (totalData) {
    return new Promise(function(resolve, reject) {
        let data_from_db_main = {}
        let request = new XMLHttpRequest();
        request.open("POST", "/total_data", true)
        request.setRequestHeader("Content-Type", "application/json")
        
        request.send(JSON.stringify(totalData))
        
        request.addEventListener("load", function () {
            // получаем и парсим ответ сервера
            let result = JSON.parse(request.response);
            
            let signs = {}
            for (let i = 0; i < Object.keys(result[0]).length; i++) {
                if (Object.keys(result[0])[i].indexOf("sign") >= 0) {
                    signs[Object.values(result[0])[i]] = ""
                }
            }
            let fact_signs = check_signs(totalData, signs)
            data_from_db_main = {
                fact_signs : fact_signs,
                total_data : result,
            }
            resolve(data_from_db_main)
        });
    })
}

export function objToJSON2 (totalData) {
    return new Promise(function(resolve, reject) {
        let data_from_db_main = {}
        let request = new XMLHttpRequest();
        request.open("POST", "/download_data", true)
        request.setRequestHeader("Content-Type", "application/json")
        
        request.send(JSON.stringify(totalData))
        
        request.addEventListener("load", function () {
            // получаем и парсим ответ сервера
            let result = JSON.parse(request.response);
            
            // let signs = {}
            // for (let i = 0; i < Object.keys(result[0]).length; i++) {
            //     if (Object.keys(result[0])[i].indexOf("sign") >= 0) {
            //         signs[Object.values(result[0])[i]] = ""
            //     }
            // }
            // let fact_signs = check_signs(totalData, signs)
            // data_from_db_main = {
            //     fact_signs : fact_signs,
            //     total_data : result,
            // }
            resolve(result)
        });
    })
}

//Автозаполнение данных в формах из базы данных (из таблицы preambulaData)
// export function appDataToJSON (object) {

//     let request = new XMLHttpRequest();
//     request.open("POST", "/app_data", true)
//     request.setRequestHeader("Content-Type", "application/json")
    
//     request.send(JSON.stringify(object))
//     request.addEventListener("load", function () {
//         // получаем и парсим ответ сервера
//         let receivedData = JSON.parse(request.response);
//         $("#fu_name").val(receivedData.fu_name)
//         $("#date_appeal").val(receivedData.date_appeal)
//         $("#fo_name").val(receivedData.fo_name)
//         $("#app_type").val(receivedData.app_type)
//         $("#app_status").val(receivedData.app_status)
//     });
// }

//Создание, удаление и заполнение таблицы с мотивировками в базе данных
export function motive_download(data) {
    let request = new XMLHttpRequest();
    request.open("POST", "/motive_download", true)
    request.setRequestHeader("Content-Type", "application/json")

    const workbook = XLSX.read(data, {type : "binary"})
    let worksheet = {}
    //Получение таблицы с признаками и наименованиями абзацев
    worksheet.motivations = XLSX.utils.sheet_to_json(workbook.Sheets['motivations 2'])
    //Получение таблицы с наименованиями абзацев и текстами абзацев
    worksheet.data = XLSX.utils.sheet_to_json(workbook.Sheets['data'])

    // console.log(worksheet.motivations[1]);
    // console.log(Object.keys(worksheet.motivations[1])[17]);
    // console.log(Object.values(worksheet.motivations[1])[17]);
    // let helper_key = Object.keys(worksheet.motivations[1])[17]
    // console.log("до изменения: " + worksheet.motivations[1][helper_key])
    // worksheet.motivations[1][helper_key] = "Новое значение ВАУ!!!"
    // console.log("после изменения: " + worksheet.motivations[1][helper_key])

    //Перебор всех строк в таблице мотивировки
    // let helper_key = ""
    // for (let i = 1; i < worksheet.motivations.length; i++) {
    //     //Перебор всех наименований абзацев для их замены на реальные абзацы
    //     for (let j = 0; j < Object.values(worksheet.motivations[i]).length; j++) {
    //         if (Object.keys(worksheet.motivations[i])[j].indexOf("motiv") >= 0) {
    //             for (let k = 0; k < worksheet.data.length; k++) {
    //                 if (worksheet.data[k]['Наименование'] == Object.values(worksheet.motivations[i])[j]) {
    //                     //Переменная для хранения наименование ключа
    //                     helper_key = Object.keys(worksheet.motivations[i])[j]
    //                     // worksheet.motivations[0][helper_key] = worksheet.motivations[i][helper_key]
    //                     worksheet.motivations[i][helper_key] = worksheet.data[k]['Текст']
    //                 }
    //                 // console.log(Object.values(worksheet.motivations[i])[j]);
    //             }
                
    //         }
    //     }
    // }
    // console.log(worksheet);


    
    //Посылаем запрос на сервер
    request.send(JSON.stringify(worksheet))
}

//Показать данные motivations в таблице
export function show_motivations() {
    let request = new XMLHttpRequest();
    request.open("POST", "/show_motivations", true)
    request.setRequestHeader("Content-Type", "application/json")

    request.send()

    request.addEventListener("load", function () {

        // получаем и парсим ответ сервера
        let receivedData = JSON.parse(request.response)

        //Если таблица motivations имеется в базе данных
        if (receivedData.result != "Таблица с мотивировками отсутствует в базе данных") {

            const gridDiv = document.querySelector('#decision_motivations')

            if (!gridDiv.childNodes.length) {

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
    
                for (let i = 1; i < Object.values(receivedData[0]).length; i++) {
                    columnDefs.push({ field: String(Object.values(receivedData[0])[i]), })
                }
                    
                const rowData = []
    
                for (let i = 1; i < receivedData.length; i++) {
                    let obj = {}
                    obj["id"] = i
                    for (let j = 1; j < columnDefs.length; j++) {
    
                        let key = columnDefs[j].field
                        let value = Object.values(receivedData[i])[j]
                        obj[key] = value
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
                        $('#article_of_the_law').find('h5').html(params.colDef.field)
                        $('#article_of_the_law').find('p').html(params.value)
                        $('#article_of_the_law').modal('show')
                    }
                }
    
                new agGrid.Grid(gridDiv, gridOptions)
            }
            $('#decision_data').hide('fast')
            $('#decision_motivations').show('fast')
            $('#decision_motivations').parent().parent().parent().show('fast')
            $('#show_motivations').modal('show')
        } else {
            alert("Таблица с мотивировками отсутствует в базе данных.\nНеобходимо загрузить таблицу")
        }
    })
}

//Показать данные data в таблице
export function show_data() {
    let request = new XMLHttpRequest();
    request.open("POST", "/show_data", true)
    request.setRequestHeader("Content-Type", "application/json")

    request.send()

    request.addEventListener("load", function () {

        // получаем и парсим ответ сервера
        let receivedData = JSON.parse(request.response)

        //Если таблица motivations имеется в базе данных
        if (receivedData.result != "Таблица с абзацами отсутствует в базе данных") {

            const gridDiv = document.querySelector('#decision_data')

            if (!gridDiv.childNodes.length) {

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
                
                                      
                for (let i = 1; i < Object.values(receivedData[0]).length; i++) {
                    columnDefs.push({ field: String(Object.keys(receivedData[0])[i]), })
                }
                    
                const rowData = []
    
                for (let i = 1; i < receivedData.length; i++) {
                    let obj = {}
                    obj["id"] = i
                    for (let j = 1; j < columnDefs.length; j++) {
    
                        let key = columnDefs[j].field
                        let value = Object.values(receivedData[i])[j]
                        obj[key] = value
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
                        $('#article_of_the_law').find('h5').html(params.colDef.field)
                        $('#article_of_the_law').find('p').html(params.value)
                        $('#article_of_the_law').modal('show')
                    }
                }
    
                new agGrid.Grid(gridDiv, gridOptions)
            }
            $('#decision_motivations').hide('fast')
            $('#decision_data').show('fast')
            $('#decision_data').parent().parent().parent().show('fast')
            $('#show_motivations').modal('show')
        } else {
            alert("Таблица с абзацами отсутствует в базе данных.\nНеобходимо загрузить таблицу")
        }
    })
}

//Удаление таблицы
export function motive_delete() {
    let request = new XMLHttpRequest();
    request.open("POST", "/motive_delete", true)
    request.setRequestHeader("Content-Type", "application/json")
    
    request.send()
    // document.querySelector('#decision_test').innerHTML = "Данные удалены";
    $('#decision_test').parent().parent().parent().hide('fast')
    // request.addEventListener("load", function () {
    // // получаем и парсим ответ сервера
    //     let receivedUser = JSON.parse(request.response);
    //     document.querySelector('#decision_test').innerHTML = receivedUser;
    // });
}