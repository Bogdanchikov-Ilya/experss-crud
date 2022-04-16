import { connection } from "../db/connection.js"
import mysql from "mysql"

class TagController {
  async getAll (req, res, next) {
    try {
      const sql = "SELECT * FROM tags"
      connection.query(sql, (err, rows, fields) => {
        if (err) return next(err);
        return res.json(rows);
      });
    } catch (e) { res.status(500).json(e) }
  }
  async getOne(req, res, next) {
    try {
      const inserts = [req.params.id]
      const sql = mysql.format("SELECT * FROM tags WHERE id = ?", inserts)
      connection.query(sql, (err, rows, fields) => {
        if (err) return next(err);
        return res.json(rows);
      });
    } catch (e) { res.status(500).json(e) }
  }
  async create(req, res, next) {
    try {
      const inserts = [req.query.tagName, req.query.tagValue]
      const sql = mysql.format("INSERT INTO tags (name, value) VALUES (?, ? )", inserts)
      connection.query(sql, (err, rows, fields) => {
        if (err) return next(err);
        // возваращаю только чтос оазднный id
        connection.query(sql, (err, rows, fields) => {
          if (err) return next(err);
          return res.json(rows);
        });
      });
    } catch (err) { res.status(500).json(err) }
  }
  async update(req, res, next) {
    try {
      const inserts = [req.query.tagName, req.query.tagValue, req.params.id]
      const sql = mysql.format("UPDATE tags SET name = ?, value = ? WHERE id = ?", inserts)
      // return res.json(sql)
      connection.query(sql,  (err, rows, fields) => {
        if (err) return next(err);
        // возвращаю обновленный айди
        connection.query("SELECT * FROM tags WHERE id = ?", [req.params.id], (err, rows, fields) => {
          if (err) return next(err);
          return res.json(rows)
        })
      });
    } catch (err) { res.status(500).json(err) }
  }
  async delete(req, res, next) {
    try {
      const inserts = [req.params.id]
      const sql = mysql.format("DELETE FROM tags WHERE id = ?", inserts)
      connection.query(sql, (err, rows, fields) => {
        if (err) return next(err)
        return res.json(`Delete ${req.params.id} completed`)
      })
    } catch (err) { res.status(500).json(err) }
  }
}
export default new TagController()
