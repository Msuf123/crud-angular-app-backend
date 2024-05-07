import  express, { NextFunction, request } from "express";
import jwt from 'jsonwebtoken'
import {con} from '../Connections/connection'
import {encryptPassword}  from '../EncryptingPassword/EncryptPassword'
import { Request,Response } from "express";
import {genrateToken} from '../TokenGeneration/Token'
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
         res.send(genrateToken({iss:username})).status(201)
      }
   })
})
signUp.post('/verifyUserName',(req:Request,res:Response,next:NextFunction)=>{
   const userName=req.body.username
   const password=req.body.password
   con.query('SELECT * FROM user WHERE id=?',[userName],(err,result:any)=>{
      if(err){
         next('Error at backed')
      }
      else{
         console.log(result[0])
      }
   })
})

signUp.post('/user',(req:Request,res:Response,next:NextFunction)=>{
  console.log(req.body)
  res.send('ok created user')
})
export {signUp}