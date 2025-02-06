import { user } from "../model/user.js";
import { registerOtp } from "../model/registerOtp.js";
import Redis from "ioredis";
import argon2 from "argon2"
const redis=new Redis()

export const registration=async(req,res)=>{
    const{username,email,password,otp}=req.body
    if(!username || !email  || !password || otp){
        return res.status(404).json({msg:"all fields are required"})
    }
    try{
        const userExist=await user.findOne({email})
        if(userExist){
            return res.status(400).json({msg:"user already exist"})
        }
        const hash=await argon2.hash(password)
        const otpTrue=await registerOtp.findOne({email})
        if(otp==otpTrue.otp){
            await registerOtp.deleteOne({email})
        }
        else{
            return res.status(404).json({msg:"wrong Otp"})
        }
        const newUser=new user({
            username,
            email,
            password:hash
        })
        await redis.set(email,hash)
        await newUser.save()
        res.status(200).json({msg:"registration sucessfully"})
    }catch(err){
        console.log(err);
        return res.status(500).json({msg:"server error in registration"})
    }
}


export const login=async(req,res)=>{
    
    const{email,password}=req.body
    console.log(email);
    try{
        const redisExist=await redis.get(email)
        res.send(redisExist)
    }catch(err){
        res.status(500).json({msg:"server error in login"})
    }
}