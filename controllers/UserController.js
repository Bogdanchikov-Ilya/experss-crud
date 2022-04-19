import { connection } from "../db/connection.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {jwtObject} from "../jswconfig.js"

const generateAccessToken = (id) => {
  const payload = {id}
  return jwt.sign(payload, jwtObject.secret, {expiresIn: "24h"})
}

class UserController {
  async signup(req, res, next) {
    try {
      const {name, password} = req.query
      const candidate = await connection.query("SELECT * FROM users WHERE name = ?", [name])
      if(candidate[0]) {
        return res.json(`Пользователь ${name} уже зарегетсрирован`)
      } else {
        const hashPassword = bcrypt.hashSync(password, 2)
        await connection.query("INSERT INTO users (name, password) VALUES (?, ?)", [name, hashPassword])
        // возврашаю нового пользователя
        const newUser = await connection.query("SELECT name FROM users WHERE id = LAST_INSERT_ID()")
        return res.status(200).json(`Пользователь ${newUser[0].name} успешно зарегетсрирован`);
      }
    } catch (e) { res.status(500).json(e)}
  }
  async login(req, res, next) {
    try {
      const {name, password} = req.query
      const candidate = await connection.query("SELECT * FROM users WHERE name = ?", [name])
      if(!candidate[0]) {
        return res.status(404).json(`Пользователь ${name} не найден`)
      }
      const validPassword = bcrypt.compareSync(password, candidate[0].password)
      if(!validPassword) {
        return res.status(400).json("Неверный пароль")
      }
      const token = generateAccessToken(candidate[0].id)
      return res.json({
        user: candidate[0].name,
        token: token
      })
      } catch (e) { res.status(500).json(e)}
  }
}

export default new UserController()
