const mysql=require('mysql');

module.exports={   
    database:{
        host:process.env.DBHOST,
        user:process.env.DBUSER,
        password:process.env.DBPASSWORD,
        database:process.env.DBDATABASE,
    }
}