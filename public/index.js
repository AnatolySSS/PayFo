const express  = require('express')
const app  = express()
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
var mysqlAdmin = require('node-mysql-admin');
app.use(mysqlAdmin(app));
const mysql  = require('mysql2')
const XLSX = require('xlsx')
const path = require('path');
const favicon = require('serve-favicon');      
 
const PORT = process.env.PORT || 80

//Загрузка css и js модулей
app.use(express.static("public/client"))
app.use(favicon(path.join(__dirname, 'public/client', 'img', 'favicon.ico')));

//Подключение к базе данных
const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    database : "payFo",
    password : "",
})

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

    let worksheet = request.body

    //Удаление таблицы
    const queryDeleteTable = `DROP TABLE if exists motivations`
    connection.query(queryDeleteTable, function (error, result) {
        if (error) throw error;
        console.log("Table deleted");
    });

    //Создание таблицы
    let queryCreateTableStr = ``
    for (const key of Object.keys(worksheet[0])) {
        queryCreateTableStr = `${queryCreateTableStr}${key} TEXT, `
    }
    queryCreateTableStr = queryCreateTableStr.slice(0, -2)

    const queryCreateTable = `CREATE TABLE if not exists motivations (id INT AUTO_INCREMENT PRIMARY KEY, ${queryCreateTableStr});`
    connection.query(queryCreateTable, function (error, result) {
    if (error) throw error;
        console.log("Table created");
    });

    //Заполнение таблицы данным из файла excel
    let queryInsertIntoMotivation = ``
    let queryInsertIntoMotivationStr
    let queryInsertIntoMotivationStrQuestionMark
    for (let i = 0; i < worksheet.length; i++) {
        queryInsertIntoMotivationStr = ``
        queryInsertIntoMotivationStrQuestionMark = ``
        for (let j = 0; j < Object.values(worksheet[i]).length; j++) {
            queryInsertIntoMotivationStr = `${queryInsertIntoMotivationStr}${Object.keys(worksheet[i])[j]}, `
            queryInsertIntoMotivationStrQuestionMark = `${queryInsertIntoMotivationStrQuestionMark}?, `
        }
        //Обрезание последних запятой и пробела в тексте запроса (поля)
        queryInsertIntoMotivationStr = queryInsertIntoMotivationStr.slice(0, -2)
        //Обрезание последних запятой и пробела в тексте запроса (знаки вопросов)
        queryInsertIntoMotivationStrQuestionMark = queryInsertIntoMotivationStrQuestionMark.slice(0, -2)
        //Формирование текста sql-запроса
        queryInsertIntoMotivation = `INSERT INTO motivations (${queryInsertIntoMotivationStr}) VALUES(${queryInsertIntoMotivationStrQuestionMark})`;
        //Занесение данных  в таблицу
        connection.query(queryInsertIntoMotivation, Object.values(worksheet[i]), (error, result) => {
            if (error) throw error
        })
    }
});

//Показать данные motivations в таблице
app.post("/show_motivations", function (request, response) {
    //Проверка на наличии таблицы motivations в базе данных
    let hasMotivation
    connection.query(`SELECT table_name FROM information_schema.tables WHERE table_schema ='payFo'`, function(err, result){ 
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

//Удаление таблицы
app.post("/motive_delete", function (request, response) {
    const queryDeleteTable = `DROP TABLE if exists motivations`
    connection.query(queryDeleteTable, function (error, result) {
    if (error) throw error;
        console.log("Table deleted");
    });
})

//Заполнение данных в таблице preambulaData
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

app.listen(PORT, () => {
    console.log("Server is runnung");
})