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

const detallepedido= sequelize.define('detallepedidos',{
    iddetallePedido:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
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
    cliente:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    ciudad:{
        type:DataTypes.STRING,
        allowNull:false
    },
    pedido:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    tipoProducto:{
        type:DataTypes.STRING,
        allowNull:false
    },
    anio:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    mes:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    dia:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    descuento:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
});

module.exports={detallepedido};