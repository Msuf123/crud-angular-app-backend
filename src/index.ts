import express,{Express,Response,Request, NextFunction, request} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {genrateToken,verifyToken} from './TokenGeneration/Token'
import {con} from './Connections/connection'
import { encryptPassword } from './EncryptingPassword/EncryptPassword'
import {signUp} from './Routes/Sign-up'
require('dotenv').config();
import passport, { DoneCallback } from 'passport'
import { JwtFromRequestFunction } from 'passport-jwt'
import { Next } from 'mysql2/typings/mysql/lib/parsers/typeCast'
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const app:Express=express()
var opts:any = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey ='shhh';
let friends=[{name:'abhi',place:'up'},{name:'vardan',place:'up'}]
app.use(cors({origin:'*'}))
app.use(bodyParser.json())
app.use(passport.initialize())
passport.use(new JwtStrategy(opts,function(jwt_payload:JwtFromRequestFunction,done:DoneCallback){
 console.log(jwt_payload,'kkkkk')
 done(null,jwt_payload)
}))
app.get('/',(req:Request,res:Response,next:NextFunction)=>{
    res.send('auth')
})
app.post('/friends/add',(req:Request,res:Response,next:NextFunction)=>{
    friends.push(req.body)
    console.log('Incomming')
    res.send(friends)
})

app.use('/sign-up',signUp)

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
app.get('/friends/auth',(req,res,next)=>{console.log(req.rawHeaders);next()},passport.authenticate('jwt',{session:false}),(req:Request,res:Response,next:NextFunction)=>{
    console.log(req.header)
    res.send('auth')
})
app.get('/friends',passport.authenticate('jwt',{session:false}),(req:Request,res:Response,next:NextFunction)=>{
    res.send(friends)
})
app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
    console.log('err')
    res.status(300).send(err)
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