import { Router } from "express";
import { registration,login } from "../controller/user.js";
const router=Router()
router.post("/sign-in",registration)
router.post("/log-in",login)
export {router}