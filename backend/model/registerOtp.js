import { Schema,model } from "mongoose";
const registerotp=new Schema({
    email:{type:Number},
    otp:{type:String}
})
const registerOtp=model("otpRegister",registerotp)
export {registerOtp}