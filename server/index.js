import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.js";
import morgan from "morgan";
import cors from "cors";

const app = express();


app.use(cors());
app.use(morgan("common"))
app.use(express.json())// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json());

dotenv.config()

const connect = async (next) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to database');
    } catch (error) {
        const { status, message } = error;
        console.log(message);
    }
}


// middlewares
app.use("/api/auth", authRouter);




app.listen(process.env.PORT, () => {
    connect()
    console.log(`Server running... ${process.env.PORT} `);
})

