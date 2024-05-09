import {factoryGenpass} from '../RandomPassword/GenPass'
import {con} from '../Connections/connection'
import {encryptPassword,decryptPassword} from '../EncryptingPassword/EncryptPassword'
import {genrateToken} from '../TokenGeneration/Token'
async function insertEmail(username,next,res){
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