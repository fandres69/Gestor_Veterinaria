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
            return res.status(StatusCodes.CONFLICT).json({
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'La ciudad ya existe',
                ciudades:[],                
                errors:[
                    {
                        msg:"La ciudad ya existe",
                        param:codigo
                    }
                ]
                

            });
        }
        await pool.query(cCiudad,[newCity.codigo,newCity.Ciudad,newCity.codigoDto,newCity.Departamento]);
        rta=getResponseOk("Ciudad creada correctamente",{newCity});
        return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Ciudad creada correctamente',
            ciudades:[
                {ciudad:newCity}
            ]        
            
        });
    } catch (error) {
        rta=getResponseError("Error al crear la ciudad");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al crear la ciudad',
            ciudades:[],
            errors:[
                {
                    msg:"Error al crear la ciudad",
                    param:codigo
                }
            ]
        

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
            return res.status(StatusCodes.CONFLICT).json({
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'La ciudad no existe',
                ciudades:[],
                errors:[
                    {
                        msg:"La ciudad no existe",
                        param:''
                    }
                ]           
            });
        }
        await pool.query(uCiudad,[CityUpdate.Ciudad,CityUpdate.codigoDto,CityUpdate.Departamento,CityUpdate.codigo]);
        rta=getResponseOk("Ciudad actualizada exitosamente",{CityUpdate});
        return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Ciudad actualizada exitosamente',
            ciudades:[CityUpdate],
            errors:[
                {
                    msg:"Ciudad actualizada exitosamente",
                    param:''
                }
            ]            
        });   
    } catch (error) {
        rta=getResponseError("Error al actualizar ciudad");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al actualizar ciudad',
            ciudades:[],
            errors:[
                {
                    msg:"Error al actualizar ciudad",
                    param:codigo
                }
            ]
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
            return res.status(StatusCodes.CONFLICT).json({
                OK:false,
                statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
                statusDescription:'La ciudad no existe',
                ciudades:[],
                errors:[
                    {
                        msg:"La ciudad no existe",
                        param:codigo
                    }
                ]
        
            });
        }
        await pool.query(dCiudad,[codigo]);
        rta=getResponseOk("Ciudad eliminada correctamente",{codigo});
        return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Ciudad eliminada correctamente',
            ciudades:[
               
            ]      
        });
    } catch (error) {
        rta=getResponseError("Error al eliminar ciudad");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al eliminar ciudad',
            ciudades:[],
            errors:[
                {
                    msg:"Error al eliminar ciudad",
                    param:codigo
                }
            ]
        });
    }
}


const searchC=async(req,res=response)=>{
    try {
        const criterio=req.params.criterio||'';
        if(criterio==='' || !criterio){
            return res.status(StatusCodes.CONFLICT)
            .json({
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'No hay criterio de búsqueda',
                ciudades:[],
                errors:[
                    {
                        msg:"No hay criterio de búsqueda",
                        param:''
                    }
                ]            
            });
        }
        const cmd=`${qCiudad} WHERE Ciudad LIKE ('%${criterio}%');`;
        const ciudades=await pool.query(cmd);
        return res.status(StatusCodes.OK)
            .json({
                OK:false,
                statusCode:StatusCodes.OK,
                statusDescription:'Ciudades encontradas',
                ciudades:ciudades,
                errors:[
                    {
                        msg:"Ciudades encontradas",
                        param:''
                    }
                ]            
            });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error en la búsqueda',
            ciudades:[],
            errors:[
                {
                    msg:"Error en la búsqueda",
                    param:''
                }
            ]
        
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
    createCity,readCity,updateCity,deleteCity,searchC,
    createTypeDocument,readTypeDocument,updateTypeDocument,deleteTypeDocument
}
