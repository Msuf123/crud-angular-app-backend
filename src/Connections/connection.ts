import sql from 'mysql2'
require('dotenv').config();
const con=sql.createPool({
    database:'friends',
    host:'localhost',
    user:process.env.databaseUsername,
    password:process.env.databaseUserpassword,
    waitForConnections:true,
    connectionLimit:20,
    connectTimeout:3000,
    maxIdle:2000,

})

export {con}