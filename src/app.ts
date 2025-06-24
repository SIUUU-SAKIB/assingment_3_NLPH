import express, { Application } from "express"
const app: Application = express()
import { router } from "./controller/controller"
app.use(express.json())
// add books
app.use('/api', router)

app.use('/', router)

export default app;