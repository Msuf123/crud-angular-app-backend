import express,{Express,Response,Request, NextFunction, request} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import {signUp} from './Routes/Sign-up'
const app:Express=express()
let friends=[{name:'abhi',place:'up'},{name:'vardan',place:'up'}]
app.use(cors({origin:'*'}))
app.use(bodyParser.json())
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
app.get('/friends',(req:Request,res:Response,next:NextFunction)=>{
    res.send(friends)
})
app.get('/friends/un',(req:Request,res:Response,next:NextFunction)=>{
 console.log('Sending the 403')
 res.status(403).send('Youe are not atuh')
})

app.listen(3003,()=>{
   
    console.log('Server up and running at http://localhost:3003')

})