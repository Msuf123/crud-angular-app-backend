import bcrypt from 'bcrypt'
function encryptPassword(password:string){
  return bcrypt.hash(password,2).then(function(hash) {
    
    return hash
});
}
function decryptPassword(plainPassword:string,hash:string){
   return bcrypt.compare(plainPassword,hash).then(function(result){
    console.log(result)
    return result
   })
}
export {encryptPassword,decryptPassword}