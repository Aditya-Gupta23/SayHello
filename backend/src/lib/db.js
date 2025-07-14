import mongoose from "mongoose";

export const connectDB=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log("connected",conn.connection.host)
    }
    catch(err){
        console.log("Error connecting to db",err)
        process.exit(1)
    }
}