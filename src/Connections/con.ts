import sql from 'mysql2'
const con=sql.createPool({
    host:'localhost',
    user:'admin',
    password:'admin@123',
    waitForConnections:true,
    connectionLimit:10,
    connectTimeout:3000,
    idleTimeout:2000,
    maxIdle:4,
    database:'friends'
})
export {con}