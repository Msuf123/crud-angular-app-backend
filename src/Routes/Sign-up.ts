import  express, { NextFunction, request } from "express";
import jwt from 'jsonwebtoken'
import { Request,Response } from "express";
const signUp=express.Router()
signUp.post('/',(req:Request,res:Response,next:NextFunction)=>{
   
})
signUp.post('/verifyUserName',(req:Request,res:Response,next:NextFunction)=>{
   console.log(req.body.username)
   if(req.body.username==='akshatmalik18t@gmail.com'){
   res.send('valid')}
   else{
      res.send('invalid')
   }
})

signUp.post('/user',(req:Request,res:Response,next:NextFunction)=>{
  console.log(req.body)
  res.send('ok created user')
})
export {signUp}