import { Router } from "express";
const router=Router()
router.get("/",(req,res)=>{
    res.send("vijay nimar")
})
export {router}