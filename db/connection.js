import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config()
const url ="Link here"
export const initDb = async()=>{
    const dbConnect = await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("MongoDb Connected Sucessfully".bgGreen.white);
    }).catch((e)=>{
        console.log(`An error ocurred ${e}`.bgRed.white);
    })
} 
