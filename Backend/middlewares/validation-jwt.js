const {response} =require('express');
const jwt=require('jsonwebtoken');
const secret=process.env.Secret_JWT;

/**
 * Middleware encargado de la validación de un JWT de usuario 
 * @param {*} req Request del usuario
 * @param {*} res Response al usuario
 * @param {*} next Determina el paso a la siguiente acción
 */
const ValidateJWT=(req,res=response,next)=>{
    //extrae el token del header
    const token= req.header('x-token');
    if (!token) {
        return res.status(400).json({
            status:'Error',
            msg:'token no enviado'
        });
    }
    try {
        //función que verifica el token generado y retorna el payload
        const payload= jwt.verify(
            token,
            secret
        );
        
        //Se pasa la información del payload al body para terminar de procesar la peticion
        req.uid=payload.uid;
        req.name=payload.name;

    } catch (err) {
        return res.status(401).json({
            status:'Error',
            msg:'token no valido'
        });
    }
    next();
}

module.exports={
    ValidateJWT,
}