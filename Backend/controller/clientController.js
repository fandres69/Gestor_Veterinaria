/**Controlador modulo clientes y mascotas */

const {response}=require('express');
const {pool}=require('../database/database');
const {StatusCodes}= require('http-status-codes')
const {getResponseError,getResponseConflict,getResponseOk}= require('../response/responseStatusCode');
const {cClientes,rClientes,uClientes,dClientes}=require('../models/clientes');
const {cMascotas,rMascotas,uMascotas,dMascotas}=require('../models/mascotas');
const {getClienteFromQuery,getClienteFromRequest,getMascotaFromRequest,getMascotaFromQuery}=require('../mapers/clientMaper');

/**
 * Crea un cliente en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const createClient=async(req,res=response)=>{
    try {
        let rta;
        const NewClient=getClienteFromRequest(req);
        const {documento}=req.body;
        const clienteExisted=await pool.query(rClientes,[documento]);
        if(clienteExisted.length>0){
            rta=getResponseConflict("El cliente ya esta registrado",{documento});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(cClientes,[NewClient.documento,NewClient.tipodocumento,NewClient.nombre,NewClient.celular,NewClient.direccion,NewClient.ciudad,NewClient.email]);
        rta=getResponseOk("Cliente creado correctamente",{NewClient});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al crear el cliente");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Consulta un clientes en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const findCliente=async(req,res=response)=>{
    try {
        let rta;
        const {documento}=req.body;
        const clienteExisted=await pool.query(rClientes,[documento]);
        if(clienteExisted.length===0){
            rta=getResponseConflict("El cliente no existe",{documento});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        const clientFind=getClienteFromQuery(clienteExisted);
        rta=getResponseOk("Cliente encontrado",{clientFind});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al consultar el cliente");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Actualiza un cliente en la DB    
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const updateCliente=async(req,res=response)=>{
    try {
        let rta;
        const {documento}=req.body;
        const clientUPdate=getClienteFromRequest(req);
        const clienteExisted=await pool.query(rClientes,[documento]);
        if(clienteExisted.length===0){
            rta=getResponseConflict("El cliente no existe",{documento});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(uClientes,[clientUPdate.tipodocumento,clientUPdate.nombre,clientUPdate.celular,clientUPdate.direccion,
            clientUPdate.ciudad,clientUPdate.email,clientUPdate.documento]);
        rta=getResponseOk("Cliente actualizado correctamente",{clientUPdate});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al actualizar el cliente");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Elimina un cliente de la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const deleteClient=async(req,res=response)=>{
    try {
        let rta;
        const {documento}=req.body;
        const clienteExisted=await pool.query(rClientes,[documento]);
        if(clienteExisted.length===0){
            rta=getResponseConflict("El cliente no existe",{documento});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(dClientes,[documento]);
        rta=getResponseOk("Cliente eliminado correctamente",{documento});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al eliminar cliente");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Crea una mascota en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const createPets=async(req,res=response)=>{
    try {
        let rta;
        const NewPet=getMascotaFromRequest(req);
        const {propietario}=req.body;
        const clienteExisted=await pool.query(rClientes,[propietario]);
        if(clienteExisted.length===0){
            rta=getResponseConflict("El cliente propietario no existe",{propietario});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(cMascotas,[NewPet.propietario,NewPet.nombre,NewPet.tipo]);
        rta=getResponseOk("Mascota creada correctamente",{NewPet});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al crear mascota");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Consulta una mascota en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const findPet=async(req,res=response)=>{
    try {
        let rta;
        const {idmascotas}=req.body;
        const PetExisted=await pool.query(rMascotas,[idmascotas]);
        if(PetExisted.length===0){
            rta=getResponseConflict("La mascota no existe",{idmascotas});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        const PetFind=getMascotaFromQuery(PetExisted);
        rta=getResponseOk("Mascota encontrada",{PetFind});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al consultar mascota");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Actualiza una mascota en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const updatePet=async(req,res=response)=>{
    try {
        let rta;
        const {idmascotas}=req.body;
        const PetUpdate=getMascotaFromRequest(req);
        const PetExisted=await pool.query(rMascotas,[idmascotas]);
        if(PetExisted.length===0){
            rta=getResponseConflict("La mascota no existe",{idmascotas});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(uMascotas,[PetUpdate.propietario,PetUpdate.nombre,PetUpdate.tipo,PetUpdate.idmascotas]);
        rta=getResponseOk("Mascota actualizada correctamente",{PetUpdate});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al actualizar mascota");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Elimina una mascota de la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const deletePet=async(req,res=response)=>{
    try {
        let rta;
        const {idmascotas}=req.body;
        const PetExisted=await pool.query(rMascotas,[idmascotas]);
        if(PetExisted.length===0){
            rta=getResponseConflict("La mascota no existe",{idmascotas});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(dMascotas,[idmascotas]);
        rta=getResponseOk("Mascota eliminada correctamente",{idmascotas});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al eliminar mascota");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}



module.exports={
    createClient,
    findCliente,
    updateCliente,
    deleteClient,
    createPets,
    findPet,
    updatePet,
    deletePet
}