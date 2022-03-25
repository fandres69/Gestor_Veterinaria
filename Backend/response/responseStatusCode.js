/**Modulo para respuestas peticiones API */

const {StatusCodes}= require('http-status-codes');

/**Respuesta genérica Api */
const responseDetail={
   
}

/**Función que crea una respuesta a las peticiones del API 
 * @param statusCode numero de código
 * @param statusDescription mensaje personalizado descripción
 * @param detail objeto a retornar
*/
const getResponse=(statusCode,statusDescription,detail,boolP)=>{
    responseDetail.ok=boolP;
    responseDetail.statusCode=statusCode;
    responseDetail.statusDescription=statusDescription;
    responseDetail.detail=detail;
    return responseDetail;
}

/**
 * Función que retorna una respuesta code 409
 * @param msg mensaje personalizado descripción
 * @param detail objeto a retornar
 */
const getResponseConflict=(msg,boolP,param)=>{
    responseDetail.OK=boolP;
    responseDetail.statusCode=StatusCodes.CONFLICT;
    responseDetail.errors=[msg,param];  
    return responseDetail;
}

/**
 * Retorna respuesta código 409
 * @param {String} msg 
 * @param {Object} detail 
 * @returns 
 */
const getResponseError=(msg,detail)=>{
    responseDetail.OK=false;
    responseDetail.statusCode=StatusCodes.INTERNAL_SERVER_ERROR;
    responseDetail.statusDescription=msg;
    responseDetail.detail=detail;
    return responseDetail;
}

/**
 * Retorna respuesta código 200
 * @param {String} msg 
 * @param {Object} detail 
 * @returns 
 */
const getResponseOk=(msg,detail,boolP)=>{
    responseDetail.OK=boolP;
    responseDetail.statusCode=StatusCodes.OK;
    responseDetail.statusDescription=msg;   
    responseDetail.detail=detail;
    const {usuario,token}=detail;
    const responseApi={
        OK:boolP,
        statusCode:StatusCodes.OK,
        statusDescription:msg,
        usuario,token
    }


    return responseApi;
}

const getResponseNotAuth=(msg,detail)=>{
    responseDetail.OK=false;
    responseDetail.statusCode=StatusCodes.UNAUTHORIZED;
    responseDetail.statusDescription=msg;
    responseDetail.detail=detail;
    return responseDetail;
}


module.exports={
    responseDetail,
    getResponse,
    getResponseConflict,
    getResponseError,
    getResponseOk,
    getResponseNotAuth
} 