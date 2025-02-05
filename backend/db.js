import mongoose from "mongoose";
import "dotenv/config"
const connection=async()=>{
    try{
       await mongoose.connect(process.env.Mongo_url)
        console.log("connected to mongoDb 😂");
    }catch(err){
        console.log(err);
        console.log("error in mongo connection");
    }
}
export default connection 