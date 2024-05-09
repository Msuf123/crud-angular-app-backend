import {factoryGenpass} from '../RandomPassword/GenPass'
import {con} from '../Connections/connection'
import {encryptPassword,decryptPassword} from '../EncryptingPassword/EncryptPassword'
import {genrateToken} from '../TokenGeneration/Token'
import { NextFunction,Response } from 'express'
async function insertEmail(username:string,next:NextFunction,res:Response){
  let pasword=factoryGenpass()
  const encryptedpasswordOfUser= await encryptPassword(pasword)
  con.query('INSERT INTO users(id,password) VALUES (?,?);',[username,encryptedpasswordOfUser],async (err,result)=>{
    if(err){
       const error=new Error(err.message)
       console.log(error)
       next(error)
    }
    else{
        res.send(genrateToken({iss:username}))
    }
 })
}
export {insertEmail}