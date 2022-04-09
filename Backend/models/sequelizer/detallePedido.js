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

const detallepedidio= sequelize.define('detallepedidio',{
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
        type:DataTypes.INTEGER,
        allowNull:false
    },
    impuesto:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    cliente:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    ciudad:{
        type:DataTypes.INTEGER,
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
    unidades:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    descuento:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
});

module.exports={detallepedidio};