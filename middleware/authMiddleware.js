import jwt from "jsonwebtoken"
import {jwtObject} from "../jswconfig.js"

export function authMiddleware(req, res, next) {
  if(req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(" ")[1]
    if(!token) {
      return res.status(403).json("Пользователь не авторизован")
    } else {
      const decodeData = jwt.verify(token, jwtObject.secret)
      req.user = decodeData
      next()
    }
  } catch (e) {
    console.log(e)
    return res.status(403).json("Пользователь не авторизован")
  }
}
