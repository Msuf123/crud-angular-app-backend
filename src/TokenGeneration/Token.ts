import jwt from 'jsonwebtoken'

function genrateToken(payload:Payload){
   return jwt.sign(payload,'shhh',{expiresIn:'1d'})
}
interface Payload{
    iss:string,
    
}
function verifyToken(token:any){
try{
 return jwt.verify(token,'shhh')}
 catch{
 
    return undefined
 }
}
export {genrateToken,verifyToken}