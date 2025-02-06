import mongoose from "mongoose";
import "dotenv/config"

const connection=async()=>{
    const url=process.env.Mongo_url
    try{
       await mongoose.connect(`${url}`)
        console.log("connected to mongoDb");
    }catch(err){
        console.log(err);
        console.log("error in mongo connection");
    }
}
export default connection 