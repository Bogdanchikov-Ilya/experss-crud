import { connection } from "../db/connection.js"
import mysql from "mysql"

class UserController {
  async signup(req, res, next) {
    try {

    } catch (e) { res.status(500).json(e)}
  }
  async login(req, res, next) {
    try {

    } catch (e) { res.status(500).json(e)}
  }
}

export default new UserController()
