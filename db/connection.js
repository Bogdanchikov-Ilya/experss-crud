import mariadb from "mariadb"
import { dbConfig } from "./db.config.js"

const pool = mariadb.createPool(dbConfig)
export let connection;

async function connectStart() {
  try {
    connection = await pool.getConnection()
    console.log("GOOD")
  } catch(e) {
    console.log(e)
    console.log("ERROR DB CONNECTION")
  }
}
connectStart()
