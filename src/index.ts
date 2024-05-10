import express,{Express,Response,Request, NextFunction, request} from 'express'

import bodyParser from 'body-parser'
import {genrateToken,verifyToken} from './TokenGeneration/Token'
import {con} from './Connections/connection'
import axions from 'axios'
let GitHubStrategy =require('passport-github2') 
import { encryptPassword } from './EncryptingPassword/EncryptPassword'
import {signUp} from './Routes/Sign-up'
import cors from 'cors'
import {factoryGenpass} from './RandomPassword/GenPass'
require('dotenv').config();
import passport, { DoneCallback, use } from 'passport'
import { JwtFromRequestFunction } from 'passport-jwt'
import { Next } from 'mysql2/typings/mysql/lib/parsers/typeCast'
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const app:Express=express()
var opts:any = {}
app.use(cors({
    origin: '*' // Replace with your frontend URL
  }));
  
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey ='shhh';
app.use((req,res,next)=>{
    let token=req.headers.authorization?.slice(7)
    let decodedToken:any=verifyToken(token)
    console.log(decodedToken,'Token in request')
    next()
})
app.use(cors({origin:'*'}))
app.use(bodyParser.json())
app.use(passport.initialize())
passport.use(new JwtStrategy(opts,function(jwt_payload:JwtFromRequestFunction,done:DoneCallback){
 done(null,jwt_payload)
}))
app.get('/',(req:Request,res:Response,next:NextFunction)=>{
    res.send('auth')
})


app.use('/sign-up',signUp)

app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
    console.log(err)
    res.status(300).send('Error on Server side')
})
app.use(passport.authenticate('jwt',{session:false}))
app.post('/friends/add',(req:Request,res:Response,next:NextFunction)=>{
    let token=req.headers.authorization?.slice(7)
    let decodedToken:any=verifyToken(token)
    let userId=decodedToken['iss']
    let name=req.body.name
    let place=req.body.place
    con.query('INSERT INTO list(id,name,place) VALUES(?,?,?);',[userId,name,place],(err,result)=>{
        if(err){
            next(err)
        }
        else{
            con.query('SELECT name,place FROM list WHERE id=?;',[userId],(err,result_sec)=>{
                if(err){
                    next(err)
                }
                else{
                    res.send(result_sec)
                }})
        }
    })
   
})
app.put('/friends',(req:Request,res:Response,next:NextFunction)=>{
    let token=req.headers.authorization?.slice(7)
    let decodedToken:any=verifyToken(token)
    let userId=decodedToken['iss']
    const name:string=req.body.name
    const place:string=req.body.place
    con.query('UPDATE  list SET place=? WHERE name=?;',[place,name],(err,rest)=>{
        if(err){
            next(err)
        }
        else{
            con.query('SELECT name,place FROM list WHERE id=?;',[userId],(err,result_sec)=>{
                if(err){
                    next(err)
                }
                else{
                    res.send(result_sec)
                }})
        }
    })

})
app.delete('/friends',(req:Request,res:Response,next:NextFunction)=>{
    const name=req.query.name
    let token=req.headers.authorization?.slice(7)
    let decodedToken:any=verifyToken(token)
    let userId=decodedToken['iss']
    con.query('DELETE FROM list WHERE name=?;',[name],(err,ress)=>{
        if(err){
            next(err)
        }
        else{
            con.query('SELECT name,place FROM list WHERE id=?;',[userId],(err,result_sec)=>{
                if(err){
                    next(err)
                }
                else{
                    res.send(result_sec)
                }})
        }
    })
})
app.get('/friends/auth',(req:Request,res:Response,next:NextFunction)=>{
    
    res.send('auth')
})
app.get('/friends',(req:Request,res:Response,next:NextFunction)=>{
    let token=req.headers.authorization?.slice(7)
   let decodedToken:any=verifyToken(token)
   let userId=decodedToken['iss']
    con.query('SELECT name,place FROM list WHERE id=?;',[userId],(err,result)=>{
        if(err){
            next(err)
        }
        else{
            res.send(result)
        }
    })
})
app.listen(3003,async()=>{
   con.query('SELECT * FROM users LIMIT 1;',(err,res)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(res)
        }
    })
   console.log('Server up and running at http://localhost:3003')
    
})