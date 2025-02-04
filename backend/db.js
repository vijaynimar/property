import mongoose from "mongoose";
import "dotenv/config"
const connection=async()=>{
    try{
        mongoose.connect(process.env.Mongo_url)
        console.log("connected to mongoDb");
    }catch(err){
        console.log("error in mongo connection");
    }
}
export default connection