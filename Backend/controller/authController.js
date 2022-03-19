const {response}=require('express');
const bcrypt=require('bcrypt');
const {pool}=require('../database/database');
const {getResponseError,getResponseConflict,getResponseOk}= require('../response/responseStatusCode')
const {StatusCodes}= require('http-status-codes')
const {qCreate,qLogin,qQueryGeneric,qQueryUser,qDeleteUser, qUpdateUser, usuario}= require('../models/usuario')
const {activoInactivoEnum}=require('../enums/activoInactivo')
const {getUserToCreate,getUserLogin,getUserToUpdate} =require('../mapers/usermaper');
const { generateJWT } = require('../helpers/JWT');

/**
 * Crea un usuario en el sistema
 * @param {require} req 
 * @param {response} res 
 * @returns Json
 */
const creareUser=async(req,res=response)=>{
    try {
        nUsuario=getUserToCreate(req);
        let rE;      
        const exist=await pool.query(qQueryUser,[nUsuario.documento]);
        if (exist.length>0) {
            rE=getResponseConflict("Documento ya existe",{});
            return res.status(StatusCodes.CONFLICT).json({rE});
        }
        let cmd=`${qQueryGeneric} WHERE email='${nUsuario.email}';`;
        const validEmail=await pool.query(cmd,[]);
        if(validEmail.length>0){
            rE=getResponseConflict("Email ya registrado",{});
            return res.status(StatusCodes.CONFLICT).json({"response":rE});
        }
        cmd=`${qQueryGeneric} WHERE usuario='${nUsuario.usuario}';`;
        const validUsuario= await pool.query(cmd,[]);
        if(validUsuario.length>0){
            rE=getResponseConflict("Usuario ya registrado",{});
            return res.status(StatusCodes.CONFLICT).json({"response":rE});
            
        }
        nUsuario.activo=activoInactivoEnum.ACTIVO;
        const salt= await bcrypt.genSalt();
        nUsuario.password=bcrypt.hashSync(nUsuario.password,salt);
        const resultado=await pool.query(qCreate,[nUsuario.documento,nUsuario.nombre,nUsuario.tipoDocumento,
            nUsuario.celular,nUsuario.email,nUsuario.password,nUsuario.usuario,nUsuario.activo]);
        rE=getResponseOk("Usuario creado correctamente",{nUsuario})
        return res.status(StatusCodes.OK).json({
            "response": rE
        })
      
    } catch (error) {
        const reErr=getResponseError('Error al crear usuario',nUsuario.documento)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          "response": reErr
        });
    }
}

/**
 * Función que realiza login en la DB
 * @param {require} req 
 * @param {response} res 
 * @returns json
 */
const loginUser=async(req,res=response)=>{
    try {
        let rta;
        User=getUserLogin(req);
        const UserDb=await pool.query(qLogin,[User.usuario]);
        if(UserDb.length===0){
          rta=getResponseConflict("El usuario no existe",{"usuario":User.usuario});
          res.status(StatusCodes.CONFLICT).json({"response":rta});
          return;
        }
        
        const validPassword=await bcrypt.compare(User.password,UserDb[0].password);
        if(!validPassword){
            rta=getResponseConflict("Password erróneo",{"usuario":User.usuario});
            res.status(StatusCodes.CONFLICT).json({"response":rta});
            return;
        }
        /**Se genera token de sesión */
        const token=await generateJWT(UserDb[0].documento,UserDb[0].usuario);
        rta=getResponseOk("Login success",{"usuario":UserDb[0].usuario,"token":token});
        return res.status(StatusCodes.OK).json({"response":rta});

    } catch (error) {
        rta=getResponseError("Error Login");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
        
    }
}

/**
 * Consulta un usuario en la DB
 * @param {request} req 
 * @param {response} res 
 */
const qUser=async(req,res=response)=>{
  try {
     const {documento}=req.body;
     let rta;
     const resultado= await pool.query(qQueryUser,[documento]);
     if(resultado.length===0){
        rta=getResponseConflict("Usuario no existe",{});
        return res.status(StatusCodes.CONFLICT).json({"response":rta}); 
     }
     rta=getResponseOk("Usuario encontrado",{resultado});
     return res.status(StatusCodes.OK).json({"response":rta});
  } catch (error) {
    rta=getResponseError("Error en consultar usuario");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
        "response":rta
    });
    
  }
}


/**
 * Elimina un usuario de la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const dUsuario=async(req,res=response)=>{
    try {
        let rta;
        const {documento}=req.body;
        const resultado= await pool.query(qQueryUser,[documento]);
        if(resultado.length===0){
            rta=getResponseConflict("Usuario no existe",{});
            return res.status(StatusCodes.CONFLICT).json({"response":rta}); 
         }
         const dlt= await pool.query(qDeleteUser,[documento]);
         if(dlt.affectedRows===0){
            rta=getResponseConflict("No se elimino el usuario",{});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
         }
         let uss=resultado[0].usuario;
         rta=getResponseOk("Usuario eliminado",{uss});
         return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error eliminación usuario");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Actualiza un usuario en DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const uUser=async(req,res=response)=>{
    try {
        let rta;
        userUpdate=getUserToUpdate(req);
        const {documento}=req.body;
        const resultado= await pool.query(qQueryUser,[documento]);
       if (resultado.length===0) {
        rta=getResponseConflict("Usuario no existe",{});
        return res.status(StatusCodes.CONFLICT).json({"response":rta}); 
       }
       const salt= await bcrypt.genSalt();
       userUpdate.password=bcrypt.hashSync(userUpdate.password,salt);
       await pool.query(qUpdateUser,[userUpdate.nombre,userUpdate.tipoDocumento,userUpdate.celular,userUpdate.email
        ,userUpdate.password,userUpdate.usuario,userUpdate.activo,userUpdate.documento]);
        rta=getResponseOk("Usuario actualizado correctamente",{userUpdate});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al actualizar usuario");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}
module.exports={
    creareUser,
    qUser,
    loginUser,
    dUsuario,
    uUser
}