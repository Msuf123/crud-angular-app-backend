import express,{Express,Response,Request, NextFunction} from 'express'
const app:Express=express()
const friends=[{name:'abhi',place:'up'},{name:'vardan',place:'up'}]
app.get('/friends',(req:Request,res:Response,next:NextFunction)=>{
    res.send(friends)
})
app.listen(3003,()=>{console.log('Server up and running at http://localhost:300')})