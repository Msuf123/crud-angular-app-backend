import express,{Express,Response,Request, NextFunction, request} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
const app:Express=express()
let friends=[{name:'abhi',place:'up'},{name:'vardan',place:'up'}]
app.use(cors({origin:'*'}))
app.use(bodyParser.json())
app.get('/',(req:Request,res:Response,next:NextFunction)=>{
    res.send('i am up and running can perform further operations')
})
app.post('/friends/add',(req:Request,res:Response,next:NextFunction)=>{
    friends.push(req.body)
    res.send(friends)
})
app.put('/friends/update',(req:Request,res:Response,next:NextFunction)=>{
    const name:string=req.body.name
    const place:string=req.body.place
    const shortListed=friends.filter((item)=>item.name===name)
    const othes=friends.filter((item)=>item.name!==name)
    shortListed[0].place=place
    const finalArray=[...shortListed,...othes]
    friends=finalArray
    console.log(friends)
    res.send(friends)
})
app.delete('/friends',(req:Request,res:Response,next:NextFunction)=>{
    const name=req.body.name
    friends=friends.filter((item)=>item.name!==name)
    res.send(friends)
})
app.get('/friends',(req:Request,res:Response,next:NextFunction)=>{
    console.log('Incomming request',req.headers)
    res.send(friends)
})

app.listen(3003,()=>{console.log('Server up and running at http://localhost:3003')})