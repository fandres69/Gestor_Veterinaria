const { Sequelize, DataTypes } =require('sequelize');

const host=process.env.DBHOST;
const user=process.env.DBUSER;
const password=process.env.DBPASSWORD;
const database=process.env.DBDATABASE;

const sequelize= new Sequelize(
    database,
    user,
    password,
    {
        host:host,
        dialect:"mysql"
    }
);

/**
 * Modelo tabla devoluciones para sequelizer
 */
const devoluciones=sequelize.define('devoluciones',{

    iddevoluciones:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    pedido:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    producto:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    cantidad:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    precio:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    impuesto:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    observaciones:{
        type:DataTypes.STRING,
        allowNull:false
    },
    descuento:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
});


module.exports={devoluciones};