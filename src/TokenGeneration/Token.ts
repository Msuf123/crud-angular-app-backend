import jwt from 'jsonwebtoken'
function genrateToken(payload:Payload){
   return jwt.sign({payload},'shh')
}
interface Payload{
    username:string,
    password:string
}
function verifyToken(token:string){
try{
 return jwt.verify(token,'shhh')}
 catch{
    return undefined
 }
}
export {genrateToken,verifyToken}