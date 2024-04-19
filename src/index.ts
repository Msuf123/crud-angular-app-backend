import express,{Express,Response,Request, NextFunction} from 'express'
import cors from 'cors'
const app:Express=express()
const friends=[{name:'abhi',place:'up'},{name:'vardan',place:'up'}]
app.use(cors({origin:'*'}))
app.get('/friends',(req:Request,res:Response,next:NextFunction)=>{
    console.log('Incomming request',req.headers)
    res.send(friends)
})
app.listen(3003,()=>{console.log('Server up and running at http://localhost:3003')})