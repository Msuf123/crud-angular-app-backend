import  express, { NextFunction } from "express";
import { Request,Response } from "express";
const signUp=express.Router()
signUp.post('/',(req:Request,res:Response,next:NextFunction)=>{
   console.log(req.body)
})
export {signUp}