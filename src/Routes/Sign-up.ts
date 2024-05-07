import  express, { NextFunction, request } from "express";
import jwt from 'jsonwebtoken'
import {con} from '../Connections/connection'
import {encryptPassword,decryptPassword}  from '../EncryptingPassword/EncryptPassword'
import { Request,Response } from "express";
import {genrateToken} from '../TokenGeneration/Token'
const signUp=express.Router()
signUp.post('/',async (req:Request,res:Response,next:NextFunction)=>{
   console.log(req.body)
   const username=req.body.userId
   const password=req.body.password
    const encryptedpasswordOfUser= await encryptPassword(password)
    console.log(encryptedpasswordOfUser)
   con.query('INSERT INTO users(id,password) VALUES (?,?);',[username,encryptedpasswordOfUser],(err,result)=>{
      if(err){
         const error=new Error(err.message)
         console.log(error)
         next(error)
      }
      else{
         console.log('Response is set and user is created')
         res.status(201).send('okay')
      }
   })
})
signUp.post('/checkUserExists',(req:Request,res:Response,next:NextFunction)=>{
   const username=req.body.username
   console.log(username)
   con.query('SELECT * FROM users WHERE id=?;',[username],(err,result:any)=>{
      if(err){
         next('Error at backend')
      }
      else{
         console.log(result)
         result.length===0?res.send('valid'):res.send('invalid')
      }
   })
  
})
signUp.post('/verifyUserName',(req:Request,res:Response,next:NextFunction)=>{
   const userName=req.body.username
   const password=req.body.password
   console.log(userName,'I am henerating token')
   con.query('SELECT * FROM users WHERE id=?;',[userName],async(err,result:any)=>{
      if(err){
         next('Error at backed')
      }
      else{
         console.log(result)
         if(result.length===0){
            console.log('Sending invladi')
            res.send('invalid')
         }
         if(result.length!==0){
            const passwordHash:string=result[0].password
            console.log(passwordHash)
            console.log(await decryptPassword(password,passwordHash),"password matching")
            await decryptPassword(password,passwordHash)?res.send(genrateToken({iss:userName})):res.send('invalid')
         }
      }
   })
})
export {signUp}