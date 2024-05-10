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
import passport, { DoneCallback } from 'passport'
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
let friends=[{name:'abhi',place:'up'},{name:'vardan',place:'up'}]
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
    console.log('err')
    res.status(300).send(err)
})
app.use(passport.authenticate('jwt',{session:false}))
app.post('/friends/add',(req:Request,res:Response,next:NextFunction)=>{
    friends.push(req.body)
    res.send(friends)
})
app.put('/friends',(req:Request,res:Response,next:NextFunction)=>{
    const name:string=req.body.name
    const place:string=req.body.place
    const shortListed=friends.filter((item)=>item.name===name)
    const othes=friends.filter((item)=>item.name!==name)
    shortListed[0].place=place
    const finalArray=[...othes,...shortListed]
    friends=finalArray
    console.log(friends)
    res.send(friends)
})
app.delete('/friends',(req:Request,res:Response,next:NextFunction)=>{
    const name=req.query.name
    friends=friends.filter((item)=>item.name!==name)
    res.send(friends)
})
app.get('/friends/auth',(req:Request,res:Response,next:NextFunction)=>{
    console.log(req.header)
    res.send('auth')
})
app.get('/friends',(req:Request,res:Response,next:NextFunction)=>{
    res.send(friends)
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