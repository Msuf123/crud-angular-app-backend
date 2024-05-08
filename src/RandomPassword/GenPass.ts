function factoryGenpass(){
   let password=''
   let counter=0
function GenPass(){
    ++counter;
    let array=['A','a','B','b','c','derf','fdjvjlfg','dfhooiejejfoij','kjsdcnjnjfhuhjrf']
    let specialChar=['!','@','#','$','%','^','&','*','!@##@!','#@%','^%&*(']
    password+=array[getRandomNumber(9)]
    password+=specialChar[getRandomNumber(10)]
    let randomIndex=getRandomNumber(2)
    if(counter<3||password.length<6){
    if(randomIndex===1||password.length<6){
    
        GenPass()
    }
    else{
        return null
    }
}
else{
    return null
}

}
GenPass()
return password
}
function getRandomNumber(n:number){
    return Math.floor(Math.random()*n)
}
export {factoryGenpass}