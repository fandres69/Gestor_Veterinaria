/**Controlador modulo clientes y mascotas */

const {response}=require('express');
const {pool}=require('../database/database');
const {StatusCodes}= require('http-status-codes')
const {getResponseError,getResponseConflict,getResponseOk}= require('../response/responseStatusCode');
const {cClientes,rClientes,uClientes,dClientes, qClientes}=require('../models/clientes');
const {cMascotas,rMascotas,uMascotas,dMascotas, qMascotas}=require('../models/mascotas');
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
            return  res.status(StatusCodes.CONFLICT)
            .json({
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'El cliente ya esta registrado',
                errors:[
                    {
                        msg:"El cliente ya esta registrado",
                        param:''
                    }
                ]
            });
        }
        await pool.query(cClientes,[NewClient.documento,NewClient.tipodocumento,NewClient.nombre,NewClient.celular,NewClient.direccion,NewClient.ciudad,NewClient.email]);
        rta=getResponseOk("Cliente creado correctamente",{NewClient});
        return  res.status(StatusCodes.OK)
        .json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Cliente creado correctamente',
            clientes:[NewClient]
        });
    } catch (error) {
        rta=getResponseError("Error al crear el cliente");
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                OK:false,
                statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
                statusDescription:'Error al crear el cliente',
                errors:[
                    {
                        msg:"Error al crear el cliente",
                        param:''
                    }
                ]
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
            return  res.status(StatusCodes.CONFLICT)
            .json({
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'El cliente no existe',
                errors:[
                    {
                        msg:"El cliente no existe",
                        param:'documento'
                    }
                ]
            });
        }
        const clientFind=getClienteFromQuery(clienteExisted);
        rta=getResponseOk("Cliente encontrado",{clientFind});
        return  res.status(StatusCodes.OK)
        .json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Cliente encontrado',
            clientes:[clientFind]
        });
    } catch (error) {
        rta=getResponseError("Error al consultar el cliente");
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                OK:false,
                statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
                statusDescription:'Error al consultar el cliente',
                errors:[
                    {
                        msg:"Error al consultar el cliente",
                        param:''
                    }
                ]
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
            return  res.status(StatusCodes.CONFLICT)
            .json({
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'El cliente no existe',
                errors:[
                    {
                        msg:"El cliente no existe",
                        param:'documento: '+documento
                    }
                ]
            });
        }
        await pool.query(uClientes,[clientUPdate.tipodocumento,clientUPdate.nombre,clientUPdate.celular,clientUPdate.direccion,
            clientUPdate.ciudad,clientUPdate.email,clientUPdate.documento]);
        rta=getResponseOk("Cliente actualizado correctamente",{clientUPdate});
        return  res.status(StatusCodes.OK)
        .json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Cliente actualizado correctamente',
           clientes:[clientUPdate]
        });
    } catch (error) {
        rta=getResponseError("Error al actualizar el cliente");
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al actualizar el cliente',
            errors:[
                {
                    msg:"Error al actualizar el cliente",
                    param:''
                }
            ]
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
            return  res.status(StatusCodes.CONFLICT)
            .json({
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'El cliente no existe',
                errors:[
                    {
                        msg:"El cliente no existe",
                        param:'documento: '+documento
                    }
                ]
            });
        }
        await pool.query(dClientes,[documento]);
        rta=getResponseOk("Cliente eliminado correctamente",{documento});
        return  res.status(StatusCodes.OK)
            .json({
                OK:true,
                statusCode:StatusCodes.OK,
                statusDescription:'Cliente eliminado correctamente',
                clientes:[clienteExisted]
            });
    } catch (error) {
        rta=getResponseError("Error al eliminar cliente");
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al eliminar cliente',
            errors:[
                {
                    msg:"Error al eliminar cliente",
                    param:''
                }
            ]
        });
    }
}

/**
 * Retorna lista de clientes a partir de un criterio y tipo de búsqueda
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const getClients=async(req,res=response)=>{
    try {
        const criterio=req.params.criterio||'';
        const tipo=req.params.tipo||'';
        if(criterio==='' || !criterio){
          return  res.status(StatusCodes.CONFLICT)
            .json({
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'No hay criterio de búsqueda',
                errors:[
                    {
                        msg:"No hay criterio de búsqueda",
                        param:''
                    }
                ]
            });
        }
        let cmd='';
        if(tipo===''||tipo==='N'){
            cmd=`${qClientes} WHERE nombre LIKE '%${criterio}%';`
        }else{
            cmd=`${qClientes} WHERE documento LIKE '%${criterio}%';`
        }

        const clientes=await pool.query(cmd);
        if(clientes.length===0){
            return res.status(StatusCodes.CONFLICT)
            .json({
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'No hay coincidencias',
                errors:[
                    {
                        msg:"No hay coincidencias",
                        param:''
                    }
                ]
            });
        }
        return res.status(StatusCodes.OK)
        .json({
            OK:false,
            statusCode:StatusCodes.OK,
            statusDescription:'Clientes encontrados',
            clientes:[clientes]
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al realizar la búsqueda',
            errors:[
                {
                    msg:"Error al realizar la búsqueda",
                    param:''
                }
            ]
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
            return res.status(StatusCodes.CONFLICT)
            .json({
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'La mascota no existe',
                errors:[
                    {
                        msg:"La mascota no existe",
                        param:''
                    }
                ]
            });
        }
        await pool.query(uMascotas,[PetUpdate.propietario,PetUpdate.nombre,PetUpdate.tipo,PetUpdate.idmascotas]);
        rta=getResponseOk("Mascota actualizada correctamente",{PetUpdate});
        return res.status(StatusCodes.OK)
        .json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Mascota actualizada correctamente',
            mascotas:[PetUpdate]
        });
    } catch (error) {
        rta=getResponseError("Error al actualizar mascota");
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al actualizar mascota',
            errors:[
                {
                    msg:"Error al actualizar mascota",
                    param:''
                }
            ]
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
            return res.status(StatusCodes.CONFLICT)
            .json({
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'La mascota no existe',
                errors:[
                    {
                        msg:"La mascota no existe",
                        param:''
                    }
                ]
            });
        }
        await pool.query(dMascotas,[idmascotas]);
        rta=getResponseOk("Mascota eliminada correctamente",{idmascotas});
        return res.status(StatusCodes.OK)
        .json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Mascota eliminada correctamente',
            mascotas:[PetExisted]
        });
    } catch (error) {
        rta=getResponseError("Error al eliminar mascota");
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al eliminar mascota',
            errors:[
                {
                    msg:"Error al eliminar mascota",
                    param:''
                }
            ]
        });
    }
}

const getMascotas=async(req,res=response)=>{
    try {
        const criterio=req.params.criterio||'';
        const tipo=req.params.tipo||'';
        if(criterio==='' || !criterio){
          return  res.status(StatusCodes.CONFLICT)
            .json({
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'No hay criterio de búsqueda',
                errors:[
                    {
                        msg:"No hay criterio de búsqueda",
                        param:''
                    }
                ]
            });
        }
        let cmd='';
        if(tipo===''||tipo==='N'){
            cmd=`${qMascotas} WHERE nombre LIKE '%${criterio}%';`
        }else{
            cmd=`${qMascotas} WHERE propietario LIKE '%${criterio}%';`
        }

        const mascotas=await pool.query(cmd);
        if(mascotas.length===0){
            return res.status(StatusCodes.CONFLICT)
            .json({
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'No hay coincidencias',
                errors:[
                    {
                        msg:"No hay coincidencias",
                        param:''
                    }
                ]
            });
        }
        return res.status(StatusCodes.OK)
        .json({
            OK:false,
            statusCode:StatusCodes.OK,
            statusDescription:'Mascotas encontradas',
            mascotas:[mascotas]
        });
        
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error buscar mascotas',
            errors:[
                {
                    msg:"Error buscar mascotas",
                    param:''
                }
            ]
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
    deletePet,
    getClients,getMascotas
}