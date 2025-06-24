import mongoose from "mongoose";
import app from "./app";

require("dotenv").config()
const server = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.y1e7y.mongodb.net/assingment-2-server?retryWrites=true&w=majority&appName=Cluster0`);
        console.log(`Connected to mongoose 😊😍`)
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on localhost:${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
server()
