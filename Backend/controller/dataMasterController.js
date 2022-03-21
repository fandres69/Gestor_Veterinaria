/**Controlador modulo datos maestros */
const {response}=require('express');
const {pool}=require('../database/database');
const {StatusCodes}= require('http-status-codes')
const {getResponseError,getResponseConflict,getResponseOk}= require('../response/responseStatusCode');
const {getCiudadFromRequest,getCiudadFromQuery,getTypeDocumentFromQuery,getTypeDocumentFromRequest}=require('../mapers/dataMasterMaper');
const {cCiudad,rCiudad,uCiudad,dCiudad,qCiudad}=require('../models/ciudad');
const {cTipoDocumento,rTipoDocumento,uTipoDocumento,dTipoDocumento,qTipoDocumento}=require('../models/tipodocumento');


//#region ciudad

/**
 * Crea una ciudad en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const createCity=async(req,res=response)=>{
    try {
        let rta;
        const newCity=getCiudadFromRequest(req);
        const {codigo}=req.body;
        const cityExisted=await pool.query(rCiudad,[codigo]);
        if(cityExisted.length>0){
            rta=getResponseConflict("La ciudad ya existe",{cityExisted});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(cCiudad,[newCity.codigo,newCity.Ciudad,newCity.codigoDto,newCity.Departamento]);
        rta=getResponseOk("Ciudad creada correctamente",{newCity});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al crear la ciudad");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Consulta una ciudad en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const readCity=async(req,res=response)=>{
    try {
        let rta;
        const {codigo}=req.body;
        const cityExisted=await pool.query(rCiudad,[codigo]);
        if(cityExisted.length===0){
            rta=getResponseConflict("La ciudad no existe",{codigo});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        const City=getCiudadFromQuery(cityExisted);
        rta=getResponseOk("Ciudad encontrada",{City});
        return res.status(StatusCodes.OK).json({"response":rta});   
    } catch (error) {
        rta=getResponseError("Error al consulta ciudad");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}   


/**
 * Actualiza una ciudad en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const updateCity=async(req,res=response)=>{
    try {
        let rta;
        const {codigo}=req.body;
        const CityUpdate=getCiudadFromRequest(req);
        const cityExisted=await pool.query(rCiudad,[codigo]);
        if(cityExisted.length===0){
            rta=getResponseConflict("La ciudad no existe",{codigo});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(uCiudad,[CityUpdate.Ciudad,CityUpdate.codigoDto,CityUpdate.Departamento,CityUpdate.codigo]);
        rta=getResponseOk("Ciudad actualizada exitosamente",{CityUpdate});
        return res.status(StatusCodes.OK).json({"response":rta});   
    } catch (error) {
        rta=getResponseError("Error al actualizar ciudad");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}


/**
 * Elimina una ciudad en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const deleteCity=async(req,res=response)=>{
    try {
        let rta;
        const {codigo}=req.body;
        const cityExisted=await pool.query(rCiudad,[codigo]);
        if(cityExisted.length===0){
            rta=getResponseConflict("La ciudad no existe",{codigo});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(dCiudad,[codigo]);
        rta=getResponseOk("Ciudad eliminada correctamente",{codigo});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al eliminar ciudad");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

//#endregion

//#region Tipo documento

/**
 * Crea una tipo de documento en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const createTypeDocument=async(req,res=response)=>{
    try {
        let rta;
        const{tipoDocumento}=req.body;
        const newTypeDocument=getTypeDocumentFromRequest(req);
        let cmd=`${qTipoDocumento} WHERE tipoDocumento='${tipoDocumento}';`;
        const typeDocumentExisted= await pool.query(cmd);
        if (typeDocumentExisted.length>0) {
            rta=getResponseConflict("El tipo de documento ya existe",{typeDocumentExisted});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});     
        }
        await pool.query(cTipoDocumento,[newTypeDocument.tipoDocumento]) ;
        rta=getResponseOk("Tipo de documento creado correctamente",{newTypeDocument});
        return res.status(StatusCodes.OK).json({"response":rta});  
    } catch (error) {
        rta=getResponseError("Error al crear tipo documento");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Consulta una tipo de documento en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const readTypeDocument=async(req,res=response)=>{
    try {
        let rta;
        const{idtipoDocumento}=req.body;
        const typeDocumentExisted= await pool.query(rTipoDocumento,[idtipoDocumento]); 
        if (typeDocumentExisted.length===0) {
            rta=getResponseConflict("El tipo de documento no existe",{idtipoDocumento});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        const TypeDocument=getTypeDocumentFromQuery(typeDocumentExisted);
        rta=getResponseOk("Tipo de documento encontrado",{TypeDocument});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al consultar tipo documento");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Actualiza una tipo de documento en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const updateTypeDocument=async(req,res=response)=>{
    try {
        let rta;
        const typeDocumentUpdate=getTypeDocumentFromRequest(req);
        const{idtipoDocumento}=req.body;
        const typeDocumentExisted= await pool.query(rTipoDocumento,[idtipoDocumento]); 
        if (typeDocumentExisted.length===0) {
            rta=getResponseConflict("El tipo de documento no existe",{idtipoDocumento});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(uTipoDocumento,[typeDocumentUpdate.tipoDocumento,typeDocumentUpdate.idtipoDocumento]);
        rta=getResponseOk("Tipo de documento actualizado correctamente",{typeDocumentUpdate});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al actualizar tipo documento");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Elimina una tipo de documento en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const deleteTypeDocument=async(req,res=response)=>{
    try {
        let rta;
        const{idtipoDocumento}=req.body;
        const typeDocumentExisted= await pool.query(rTipoDocumento,[idtipoDocumento]); 
        if (typeDocumentExisted.length===0) {
            rta=getResponseConflict("El tipo de documento no existe",{idtipoDocumento});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(dTipoDocumento,[idtipoDocumento]);
        rta=getResponseOk("Tipo documento eliminado Correctamente",{idtipoDocumento});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al eliminar tipo de documento");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}


//#endregion

module.exports={
    createCity,readCity,updateCity,deleteCity,
    createTypeDocument,readTypeDocument,updateTypeDocument,deleteTypeDocument
}
