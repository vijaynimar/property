import { Router } from "express";
import { registration,login } from "../controller/user.js";
import { sendRegisterOtp } from "../controller/nodemailer.js";
const router=Router()
router.post("/sign-in",registration)
router.post("/log-in",login)
router.post("/otp-register",sendRegisterOtp)
export {router}