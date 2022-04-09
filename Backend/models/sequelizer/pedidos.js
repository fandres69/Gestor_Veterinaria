const { Sequelize, DataTypes } =require('sequelize');

const host=process.env.DBHOST;
const user=process.env.DBUSER;
const password=process.env.DBPASSWORD;
const database=process.env.DBDATABASE;

console.log(host);
console.log(user);
console.log(password);
console.log(database);

const sequelize= new Sequelize(
    database,
    user,
    password,
    {
        host:host,
        dialect:"mysql"
    }
);

const pedidos= sequelize.define('pedidos',{
    idpedidos:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    cliente:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    direccionEntrega:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ciudad:{
        type:DataTypes.STRING,
        allowNull:false
    },
    observaciones:{
        type:DataTypes.STRING,
        allowNull:true
    },
    dia:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    mes:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    anio:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});

module.exports={pedidos};