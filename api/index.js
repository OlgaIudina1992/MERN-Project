import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js"

const app = express();
dotenv.config()

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("connected to mdb")
    }catch(error){
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mdb offline")
})
mongoose.connection.on("connected", () => {
    console.log("mdb online")
})

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);


app.listen(5000, () => {
    connect();
    console.log("Server running")
}); 