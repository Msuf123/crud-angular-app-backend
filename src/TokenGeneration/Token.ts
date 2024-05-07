import jwt from 'jsonwebtoken'
function genrateToken(payload:Payload){
   return jwt.sign(payload,'shh')
}
interface Payload{
    iss:string,
    
}
function verifyToken(token:string){
try{
 return jwt.verify(token,'shh')}
 catch{
 
    return undefined
 }
}
export {genrateToken,verifyToken}