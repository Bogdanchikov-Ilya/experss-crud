import express from "express";
import routes from "./routes.js";

const PORT = 5000;
const app = express()

app.use(express.json())
app.use('/api', routes)

async function startApp() {
  // подключаюсь к БД
  try {
    app.listen(PORT, () => console.log("SERVER START " + PORT))
  } catch (e) {
    console.log(e)
  }
}
startApp()

