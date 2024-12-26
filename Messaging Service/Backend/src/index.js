import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv" 
import {connectDB} from "./lib/db.js"

dotenv.config();
const PORT = process.env.PORT

const app = express();

app.use("/api/auth",authRoutes);

app.listen(PORT, ()=> {
    console.log("Server is running on PORT:"+PORT)
    connectDB();
});