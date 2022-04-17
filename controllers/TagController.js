import { connection } from "../db/connection.js"

class TagController {
  async getAll (req, res, next) {
    try {
      const result = await connection.query("SELECT * FROM tags");
      return res.status(200).json(result)
    } catch (e) { res.status(500).json(e) }
  }
  async getOne(req, res, next) {
    try {
      const inserts = [req.params.id]
      const sql = "SELECT * FROM tags WHERE id = ?"
      const result = await connection.query(sql, inserts)
      return res.status(200).json(result)
    } catch (e) { res.status(500).json(e) }
  }
  async create(req, res, next) {
    try {
      const inserts = [req.query.name, req.query.value]
      const sql = "INSERT INTO tags (name, value) VALUES (?, ?)"
      await connection.query(sql, inserts)
      return res.status(200).json(await connection.query("SELECT * FROM tags WHERE id = LAST_INSERT_ID()"))
    } catch (err) { res.status(500).json(err) }
  }
  async update(req, res, next) {
    try {
      const inserts = [req.query.name, req.query.value, req.params.id]
      const sql = "UPDATE tags SET name = ?, value = ? WHERE id = ?"
      await connection.query(sql, inserts);
      await this.getOne(req, res, next)
    } catch (err) { res.status(500).json(err) }
  }
  async delete(req, res, next) {
    try {
      const inserts = [req.params.id]
      let obj = await connection.query("SELECT * FROM tags WHERE id = ?", inserts)
      if(obj[0]) {
        const sql = "DELETE FROM tags WHERE id = ?"
        await connection.query(sql, inserts)
        res.status(200).json("DELETE ID = " + req.params.id)
      } else {
        res.status(404).json("ID " + req.params.id + " NOT FOUND")
      }
    } catch (err) { res.status(500).json(err) }
  }
}
export default new TagController()
