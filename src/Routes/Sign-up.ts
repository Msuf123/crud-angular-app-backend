import  express, { NextFunction, request } from "express";
import jwt from 'jsonwebtoken'
import {con} from '../Connections/connection'
import {encryptPassword}  from '../EncryptingPassword/EncryptPassword'
import { Request,Response } from "express";
const signUp=express.Router()
signUp.post('/',async (req:Request,res:Response,next:NextFunction)=>{
   const username=req.body.username
   const password=req.body.password
    const encryptedpassword= await encryptPassword(password)
   con.query('INSERT INTO users(id,password) VALUES (?,?);',[username,password],(err,result)=>{
      if(err){
         const error=new Error(err.message)
         console.log(error)
         next(error)
      }
      else{
         res.send('okay')
      }
   })
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