import {StreamChat} from "stream-chat";
import "dotenv/config"
const apiKey=process.env.STEAM_API_KEY
const apiSecret = process.env.STEAM_API_SECRET;

if(!apiKey||!apiSecret){
    console.error("Steam api key or secret missing");
}

const streamClient=StreamChat.getInstance(apiKey,apiSecret);

export const upseartStreamUser=async(userData)=>{
    try{
        await streamClient.upsertUser(userData);
        return userData;
    }catch(err){
        console.error("Error upserting stream user",err);
    }
}

export const generateStreamToken=(userId)=>{
    try {
        const userIdStr=userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.log("error generating stream token");
    }
}