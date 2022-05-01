import express, { Application } from "express"
import { ConnectDatabase } from "./lib"
import * as dotenv from "dotenv"
import path from "path"
import MainRouter from "./routes"
import cors from "cors"

const app: Application = express()
dotenv.config()

const PORT = process.env.PORT || 5050

ConnectDatabase()
app.use(cors())
app.use(express.json())
app.set("view engine", "ejs")
app.engine("html", require("ejs").renderFile)
app.use(express.static(path.join(__dirname, "views")))
app.use("/", MainRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
