import crypto from "node:crypto"
import { registerOtp } from "../model/registerOtp.js";
import nodemailer from "nodemailer"
const transport=nodemailer.createTransport({
    host:"smtp.gmail.com",
    Auth:{
        host:"",
        pass:""
    }
})

export const registerOtp=async(req,res)=>{
    const {email}=req.body
    try{
        const otpExist=await registerOtp.findOne({email})
        if(otpExist){
            await registerOtp.deleteOne({email})
        }
        const otp=crypto.randomInt(10000,100000)

        const newotp=new registerOtp({
            email,
            otp:otp
        })
        await newotp.save()
    }catch(err){
        res.status(500).json({msg:"server error in register otp"})
    }
}