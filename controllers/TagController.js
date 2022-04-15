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
  async getOne(req, res) {
    try {
      connection.query('SELECT * FROM tags WHERE id = ?', req.params.id, function(err, rows, fields) {
        if (err) throw err;
        return res.json(rows);
      });
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async create(req, res) {
    try {
      let tag = {
        tagName: req.query.tagName.toString(),
        tagValue: req.query.tagValue
      }
      connection.query("INSERT INTO `tags` (`name`, `value`) VALUES ('" + tag.tagName + "'," + tag.tagValue + ")",  function(err, rows, fields) {
        if (err) throw err;
          res.status(200, {message: `Успешно.`, rows}, res)
      });
    } catch (e) {
      res.status(500).json(e)
    }
  }
}
export default new TagController()
