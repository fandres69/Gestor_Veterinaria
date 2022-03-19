/**Modulo para respuestas peticiones API */

const {StatusCodes}= require('http-status-codes');

/**Respuesta genérica Api */
const resDetail={
    statusCode:0,
    statusDescription:'',
    detail:{}
}

/**Función que crea una respuesta a las peticiones del API 
 * @param statusCode numero de código
 * @param statusDescription mensaje personalizado descripción
 * @param detail objeto a retornar
*/
const getResponse=(statusCode,statusDescription,detail)=>{
    resDetail.statusCode=statusCode;
    resDetail.statusDescription=statusDescription;
    resDetail.detail=detail;
    return resDetail;
}

/**
 * Función que retorna una respuesta code 409
 * @param msg mensaje personalizado descripción
 * @param detail objeto a retornar
 */
const getResponseConflict=(msg,detail)=>{
    resDetail.statusCode=StatusCodes.CONFLICT;
    resDetail.statusDescription=msg;
    resDetail.detail=detail;
    return resDetail;
}

/**
 * Retorna respuesta código 409
 * @param {String} msg 
 * @param {Object} detail 
 * @returns 
 */
const getResponseError=(msg,detail)=>{
    resDetail.statusCode=StatusCodes.INTERNAL_SERVER_ERROR;
    resDetail.statusDescription=msg;
    resDetail.detail=detail;
    return resDetail;
}

/**
 * Retorna respuesta código 200
 * @param {String} msg 
 * @param {Object} detail 
 * @returns 
 */
const getResponseOk=(msg,detail)=>{
    resDetail.statusCode=StatusCodes.OK;
    resDetail.statusDescription=msg;
    resDetail.detail=detail;
    return resDetail;
}

const getResponseNotAuth=(msg,detail)=>{
    resDetail.statusCode=StatusCodes.UNAUTHORIZED;
    resDetail.statusDescription=msg;
    resDetail.detail=detail;
    return resDetail;
}

module.exports={
    resDetail,
    getResponse,
    getResponseConflict,
    getResponseError,
    getResponseOk,
    getResponseNotAuth
} 