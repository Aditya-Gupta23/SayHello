import express from "express"
import dotenv from "dotenv"
import authRoutes from './routes/auth.route.js'
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import userRoutes from './routes/user.route.js'
import chatRoutes from './routes/chat.route.js'
import cors from "cors"

dotenv.config()

const app=express()
const PORT=process.env.PORT

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/chat",chatRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDB()
});