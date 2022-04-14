import mysql from "mysql"
import { dbConfig } from "./db.config.js"

export const connection = mysql.createConnection(dbConfig)

connection.connect((error) => {
  if(error) {
    return console.log('Ошибка подключения к БД!');
  } else {
    return console.log('Подлючение успешно!');
  }
})
