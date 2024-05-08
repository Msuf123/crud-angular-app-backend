function factoryGenpass(){
   let password=''
   let counter=0
function GenPass(){
    ++counter;
    let array=['A','a','B','b','c','derf','fdjvjlfg','dfhooiejejfoij','kjsdcnjnjfhuhjrf']
    let specialChar=['!','@','#','$','%','^','&','*','!@##@!','#@%','^%&*(']
    password+=array[getRandomNumber(10)]
    password+=array[getRandomNumber(11)]
    let randomIndex=getRandomNumber(2)
    if(counter<3){
    if(randomIndex===1){
        console.log('runinng again')
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
}
function getRandomNumber(n:number){
    return Math.floor(Math.random()*n)
}
export {factoryGenpass}