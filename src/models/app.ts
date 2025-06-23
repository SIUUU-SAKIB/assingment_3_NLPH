import express, { Application, Request, Response } from "express"
import { model, Mongoose, Schema } from "mongoose"
const app: Application = express()
app.use(express.json())
const schema = new Schema({
   name: { type: String },
   phnNum: { type: Number }
})
app.post(`/data`, async (req: Request, res: Response) => {
   const data = req.body
   console.log(data)
   await Dummy.create(data)
   res.send({ success: true })
})
app.get('/', (req: Request, res: Response) => {
   res.send(`hello 😊`)
})
const Dummy = model(`dummy`, schema)
export default app;