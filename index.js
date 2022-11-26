require('dotenv').config()
// const word = require('./word.js')
const express  = require('express')
const app  = express()
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
var mysqlAdmin = require('node-mysql-admin');
app.use(mysqlAdmin(app));

const fs = require('fs');
// const mysql  = require('mysql2')
const mysql = require('mysql');
const XLSX = require('xlsx')
const path = require('path');
const favicon = require('serve-favicon');   
 
const PORT = process.env.PORT || 80

//Загрузка css и js модулей
// app.use(express.static("client"))
app.use(express.static(path.join(__dirname, "client")))
app.use(favicon(path.join(__dirname, 'client', 'img', 'favicon.ico')));

//Подключение к базе данных timeweb
// const connection = mysql.createConnection({
//     host : process.env.DB_HOST,
//     port : process.env.DB_PORT,
//     user : process.env.DB_USER,
//     database : process.env.DB_NAME,
//     password : process.env.DB_PASSWORD,
// })
const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    database : "payfo",
    password : "svF3L3Zm",
})

//Подключение к  локальной базе данных 
// const connection = mysql.createConnection({
//     host : "localhost",
//     user : "root",
//     database : "payFo",
//     password : "",
// })

// Подключение к базе данных Яндекс Облако
// const connection = mysql.createConnection({
//     host     : process.env.DB_HOST,
//     port     : process.env.DB_PORT,
//     user     : process.env.DB_USER,
//     password : process.env.DB_PASSWORD,
//     database : process.env.DB_NAME,
//     ssl  : {
//       ca : fs.readFileSync('root.crt'),
//     }
// });

connection.connect(function(error) {
    if (error) {
        return console.error("Ошибка " + error.message)
    } else {
        console.log("Подключение прошло успешно");
    }
})

const jsonParser = express.json()

//Создание, удаление и заполнение таблицы с мотивировками в базе данных
app.post("/motive_download", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400)

    let motivations = request.body.motivations
    let data = request.body.data

    //Удаление таблицы motivations
    const queryDeleteTableMotivations = `DROP TABLE if exists motivations`
    connection.query(queryDeleteTableMotivations, function (error, result) {
        if (error) throw error;
        console.log("Table deleted");
    });

    //Удаление таблицы motivations
    const queryDeleteTableData = `DROP TABLE if exists data`
    connection.query(queryDeleteTableData, function (error, result) {
        if (error) throw error;
        console.log("Table deleted");
    });

    //Создание таблицы motivations
    let queryCreateTableStr = ``
    for (const key of Object.keys(motivations[0])) {
        queryCreateTableStr = `${queryCreateTableStr}${key} TEXT, `
    }
    queryCreateTableStr = queryCreateTableStr.slice(0, -2)

    const queryCreateTable = `CREATE TABLE if not exists motivations (id INT AUTO_INCREMENT PRIMARY KEY, ${queryCreateTableStr});`
    connection.query(queryCreateTable, function (error, result) {
    if (error) throw error;
        console.log("Table created");
    });

    //Изменяем кодировку motivations
    let queryChangeCoding = ""
    for (const key of Object.keys(motivations[0])) {
        queryChangeCoding = `ALTER TABLE motivations CHANGE ${key} ${key} TEXT CHARACTER set utf8mb4 COLLATE utf8mb4_unicode_ci;`
        connection.query(queryChangeCoding, function (error, result) {
        if (error) throw error;
            console.log("Table created");
        });
    }
    
    //Заполнение таблицы данными из файла excel
    let queryInsertIntoMotivation = ``
    let queryInsertIntoMotivationStr
    let queryInsertIntoMotivationStrQuestionMark
    for (let i = 0; i < motivations.length; i++) {
        queryInsertIntoMotivationStr = ``
        queryInsertIntoMotivationStrQuestionMark = ``
        for (let j = 0; j < Object.values(motivations[i]).length; j++) {
            queryInsertIntoMotivationStr = `${queryInsertIntoMotivationStr}${Object.keys(motivations[i])[j]}, `
            queryInsertIntoMotivationStrQuestionMark = `${queryInsertIntoMotivationStrQuestionMark}?, `
        }
        //Обрезание последних запятой и пробела в тексте запроса (поля)
        queryInsertIntoMotivationStr = queryInsertIntoMotivationStr.slice(0, -2)
        //Обрезание последних запятой и пробела в тексте запроса (знаки вопросов)
        queryInsertIntoMotivationStrQuestionMark = queryInsertIntoMotivationStrQuestionMark.slice(0, -2)
        //Формирование текста sql-запроса
        queryInsertIntoMotivation = `INSERT INTO motivations (${queryInsertIntoMotivationStr}) VALUES(${queryInsertIntoMotivationStrQuestionMark})`;
        //Занесение данных  в таблицу
        connection.query(queryInsertIntoMotivation, Object.values(motivations[i]), (error, result) => {
            if (error) throw error
        })
    }

    //Создание таблицы data
    let queryCreateTableStrData = ``
    for (const key of Object.keys(data[0])) {
        queryCreateTableStrData = `${queryCreateTableStrData}${key} TEXT, `
    }
    queryCreateTableStrData = queryCreateTableStrData.slice(0, -2)

    const queryCreateTableData = `CREATE TABLE if not exists data (id INT AUTO_INCREMENT PRIMARY KEY, ${queryCreateTableStrData});`
    connection.query(queryCreateTableData, function (error, result) {
    if (error) throw error;
        console.log("Table created");
    });

    //Изменяем кодировку data
    let queryChangeCodingData = ""
    for (const key of Object.keys(data[0])) {
        queryChangeCodingData = `ALTER TABLE data CHANGE ${key} ${key} TEXT CHARACTER set utf8mb4 COLLATE utf8mb4_unicode_ci;`
        connection.query(queryChangeCodingData, function (error, result) {
        if (error) throw error;
            console.log("Table created");
        });
    }

    //Заполнение таблицы data данными из файла excel
    let queryInsertIntoData = ``
    let queryInsertIntoDataStr
    let queryInsertIntoDataStrQuestionMark
    for (let i = 0; i < data.length; i++) {
        queryInsertIntoDataStr = ``
        queryInsertIntoDataStrQuestionMark = ``
        for (let j = 0; j < Object.values(data[i]).length; j++) {
            queryInsertIntoDataStr = `${queryInsertIntoDataStr}${Object.keys(data[i])[j]}, `
            queryInsertIntoDataStrQuestionMark = `${queryInsertIntoDataStrQuestionMark}?, `
        }
        //Обрезание последних запятой и пробела в тексте запроса (поля)
        queryInsertIntoDataStr = queryInsertIntoDataStr.slice(0, -2)
        //Обрезание последних запятой и пробела в тексте запроса (знаки вопросов)
        queryInsertIntoDataStrQuestionMark = queryInsertIntoDataStrQuestionMark.slice(0, -2)
        //Формирование текста sql-запроса
        queryInsertIntoData = `INSERT INTO data (${queryInsertIntoDataStr}) VALUES(${queryInsertIntoDataStrQuestionMark})`;
        //Занесение данных  в таблицу
        connection.query(queryInsertIntoData, Object.values(data[i]), (error, result) => {
            if (error) throw error
        })
    }
});

//Показать данные motivations в таблице
app.post("/show_motivations", function (request, response) {
    //Проверка на наличии таблицы motivations в базе данных
    let hasMotivation
    connection.query(`SELECT table_name FROM information_schema.tables WHERE table_schema ='payfo'`, function(err, result){ 
        hasMotivation = false
        result.forEach(element => {
            if (Object.values(element) == 'motivations') {
                hasMotivation = true
            }
        })
        if (hasMotivation) {
            const querySelect = `SELECT * FROM motivations`
            connection.query(querySelect, (error, result) => {
                if (error) throw error
                response.json(result); // отправляем пришедший ответ обратно
            })
        } else {
            response.json({ result : "Таблица с мотивировками отсутствует в базе данных" });
        }
    })    
})

//Показать данные data в таблице
app.post("/show_data", function (request, response) {
    //Проверка на наличии таблицы motivations в базе данных
    let hasData
    connection.query(`SELECT table_name FROM information_schema.tables WHERE table_schema ='payfo'`, function(err, result){ 
        hasData = false
        result.forEach(element => {
            if (Object.values(element) == 'data') {
                hasData = true
            }
        })
        if (hasData) {
            const querySelect = `SELECT * FROM data`
            connection.query(querySelect, (error, result) => {
                if (error) throw error
                response.json(result); // отправляем пришедший ответ обратно
            })
        } else {
            response.json({ result : "Таблица с Абзацами отсутствует в базе данных" });
        }
    })    
})

//Удаление таблицы
app.post("/motive_delete", function (request, response) {
    const queryDeleteTable = `DROP TABLE if exists motivations`
    connection.query(queryDeleteTable, function (error, result) {
    if (error) throw error;
        console.log("Table deleted");
    });
})

//Получает данные из таблицы с мотивировками и формирует объект, с полями (все признаки)
app.post("/total_data", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400)

    // let data = [request.body.preambulaData.appeal_number, 
    //             request.body.preambulaData.date_appeal, 
    //             request.body.preambulaData.fu_name, 
    //             request.body.preambulaData.fo_name, 
    //             request.body.preambulaData.app_type, 
    //             request.body.preambulaData.app_status]

    // const queryInsert = "INSERT INTO preambulaData(appeal_number, date_appeal, fu_name, fo_name, app_type, app_status) VALUES(?, ?, ?, ?, ?, ?)";
    // connection.query(queryInsert, data, (error, result) => {
        
    // })

    // const querySelect = "SELECT * from preambulaData"
    // connection.query(querySelect, (error, result) => {
    //     if (error) throw error;
    // })

    const querySelectFromMotivation = "SELECT * from motivations"
    connection.query(querySelectFromMotivation, (error, result) => {
        if (error) throw error;
        response.json(result)
    })
 
    // response.json(request.body); // отправляем пришедший ответ обратно
});

app.post("/download_data", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400)

    const querySelectFromMotivation = "SELECT * from data"
    connection.query(querySelectFromMotivation, (error, result) => {
        if (error) throw error;
        response.json(result)
    })
});

//Загрузка данных из таблицы preambulaData в поля
app.post("/app_data", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400)

    const querySelect = `SELECT * FROM preambulaData WHERE appeal_number = '${request.body.data}'`

    connection.query(querySelect, (error, result) => {
        if (error) throw error;
        response.json(result[0]); // отправляем пришедший ответ обратно
    })
});

//Загрузка главной страницы
app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server is running");
    console.log(PORT);
})