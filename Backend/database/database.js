const mysql=require('mysql');
const {promisify}=require('util');
const {database}=require('./configDB');
const pool=mysql.createPool(database);

pool.getConnection((err,connection)=>{
    if(err){
        throw err;
    }
    if(connection) connection.release();
    console.log('Database connected successfully');
    return;
});

/**Convierte las consultas en promesas de DB */
pool.query= promisify(pool.query);

module.exports={
    pool
}