import { connection } from "../db/connection.js"
class TagController {
  async getAll (req, res) {
    try {
      connection.query('SELECT * FROM tags', function(err, rows, fields) {
        if (err) throw err;
        return res.json(rows);
      });
    } catch (e) {
      res.status(500).json(e)
    }
  }
}
export default new TagController()
