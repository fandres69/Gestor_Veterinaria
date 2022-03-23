/**Mapea las peticiones  de creación y actualización de un cliente y la mascota*/
const e = require('express');
const {cliente,mascotas}=require('../models/clientes');

/**
 * Retorna un modelo de cliente desde un request
 * @param {request} req 
 * @returns Object
 */
const getClienteFromRequest=(req)=>{
    const nCliente={...cliente};
    const{documento,tipodocumento,nombre,celular,direccion,ciudad,email}=req.body;
    nCliente.documento=documento;
    nCliente.tipodocumento=tipodocumento;
    nCliente.nombre=nombre;
    nCliente.celular=celular;
    nCliente.direccion=direccion;
    nCliente.ciudad=ciudad;
    nCliente.email=email;
    return nCliente;
}

/**
 * Retorna un modelo de cliente desde el resultado de un query
 * @param {query} result 
 * @returns Object
 */
 const getClienteFromQuery=(result)=>{
    const nCliente={...cliente};
    nCliente.documento==result[0].documento;
    nCliente.tipodocumento=result[0].tipodocumento;
    nCliente.nombre=result[0].nombre;
    nCliente.celular=result[0].celular;
    nCliente.direccion=result[0].direccion;
    nCliente.ciudad=result[0].ciudad;
    nCliente.email=result[0].email;
    return nCliente;
}

/**
 * retorna un modelo de mascota desde un request
 * @param {request} req 
 * @returns Object
 */
const getMascotaFromRequest=(req)=>{
    const nMascota={...mascotas};
    const{idmascotas,propietario,nombre,tipo}=req.body;
    nMascota.idmascotas=idmascotas;
    nMascota.propietario=propietario;
    nMascota.nombre=nombre;
    nMascota.tipo=tipo;
    return nMascota;
}
/**
 * retorna un modelo de mascota desde el resultado de una consulta
 * @param {request} result 
 * @returns Object
 */
const getMascotaFromQuery=(result)=>{
    const nMascota={...mascotas};
    nMascota.idmascotas=result[0].idmascotas;
    nMascota.propietario=result[0].propietario;
    nMascota.nombre=result[0].nombre;
    nMascota.tipo=result[0].tipo;
    return nMascota;
}

module.exports={
    getClienteFromRequest,getClienteFromQuery,getMascotaFromRequest,getMascotaFromQuery
}