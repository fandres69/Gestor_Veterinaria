const {response} =require('express');
const jwt=require('jsonwebtoken');
const {getResponseConflict,getResponseNotAuth}=require('../response/responseStatusCode')
const secret=process.env.Secret_JWT;
const {StatusCodes}= require('http-status-codes');

/**
 * Middleware encargado de la validación de un JWT de usuario 
 * @param {*} req Request del usuario
 * @param {*} res Response al usuario
 * @param {*} next Determina el paso a la siguiente acción
 */
const ValidateJWT=(req,res=response,next)=>{
    //extrae el token del header
    const token= req.header('x-token');
    let rta;
    if (!token) {
        rta=getResponseConflict("token no enviado",{});
        return res.status(StatusCodes.CONFLICT).json({"response":rta}); 
    }
    try {
        //función que verifica el token generado y retorna el payload
        const payload= jwt.verify(
            token,
            secret
        );
        
        //Se pasa la información del payload al body para terminar de procesar la petición
        req.documento=payload.uid;
        req.usuario=payload.name;

    } catch (err) {
        rta=getResponseNotAuth('token no valido')
        return res.status(StatusCodes.UNAUTHORIZED).json({rta});
    }
    next();
}

module.exports={
    ValidateJWT,
}