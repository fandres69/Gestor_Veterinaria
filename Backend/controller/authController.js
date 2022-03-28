const {response}=require('express');
const bcrypt=require('bcrypt');
const {pool}=require('../database/database');
const {getResponseError,getResponseConflict,getResponseOk}= require('../response/responseStatusCode')
const {StatusCodes}= require('http-status-codes')
const {qCreate,qLogin,qQueryGeneric,qQueryUser,qDeleteUser, qUpdateUser}= require('../models/usuarios')
const {activoInactivoEnum}=require('../enums/activoInactivo')
const {getUserToCreate,getUserLogin,getUserToUpdate, getUserFromQuery} =require('../mapers/usermaper');
const { generateJWT } = require('../helpers/JWT');
const { enumStatus, enumMsgLogin } = require('../response/responseMessages');
const { qTipoDocumento } = require('../models/tipodocumento');

/**
 * Crea un usuario en el sistema
 * @param {request} req 
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
            return res.status(StatusCodes.CONFLICT).json({OK:enumStatus.err,MSG:enumMsgLogin.DOC_EXISTED,document:nUsuario.documento});
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
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const loginUser=async(req,res=response)=>{
    try {
        let responseApi;
        User=getUserLogin(req);
        const UserDb=await pool.query(qLogin,[User.usuario]);
        if(UserDb.length===0){
          responseApi=getResponseConflict("El usuario no existe",{"usuario":User.usuario},enumStatus.err);
          res.status(StatusCodes.CONFLICT).json({responseApi});
          return;
        }
        
        const validPassword=await bcrypt.compare(User.password,UserDb[0].password);
        if(!validPassword){
            responseApi=getResponseConflict("Password erróneo",{"usuario":User.usuario},enumStatus.err);

            res.status(StatusCodes.CONFLICT).json({
                OK:enumStatus.err,
                statusCode:StatusCodes.CONFLICT,
                errors:[
                { msg:enumMsgLogin.U_ERR_PASSWORD,param:'password'},
                ],
                "usuario":UserDb[0].usuario                
            });
            return;
        }
        /**Se genera token de sesión */
        const token=await generateJWT(UserDb[0].documento,UserDb[0].usuario);
        responseApi={};
        return res.status(StatusCodes.OK).json({
            OK:enumStatus.ok,
            statusCode:StatusCodes.OK,
            statusDescription:enumMsgLogin.U_LOGIN_SUCCESS,
            "usuario":UserDb[0].usuario,
            "token":token,
            "id":UserDb[0].documento
        });

    } catch (error) {
        responseApi=getResponseError("Error Login");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
           responseApi
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
     const qUser=getUserFromQuery(resultado);
     return res.status(StatusCodes.OK).json({
         OK:true,
         statusCode:StatusCodes.OK,
         statusDescription:'Usuario encontrado',       
        documento:qUser.documento,
        nombre:qUser.nombre,
        tipoDocumento:qUser.tipoDocumento,
        celular:qUser.celular,
        email:qUser.email,   
        password:'',       
        usuario:qUser.usuario
         
     });
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


const validToken=async(req,res=response)=>{
    try {
        let responseApi;
        return res.status(StatusCodes.OK).json({
            OK:enumStatus.ok,
            statusCode:StatusCodes.OK,
            statusDescription:enumMsgLogin.TOKEN_VALID
        });
    } catch (error) {
        
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          Ok:enumStatus.err,
          statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         
        });
    }
}


const allTypeDoc=async(req,res=response)=>{
    try {
       const result= await pool.query(qTipoDocumento);
       if(result.length===0){
        return res.status(StatusCodes.CONFLICT)
        .json({
           OK:false           
        });
       }
       return res.status(StatusCodes.OK).json({
           result
       })
        
    } catch (error) {
        
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
           OK:false,
           
        });
    }
}

module.exports={
    creareUser,
    qUser,
    loginUser,
    dUsuario,
    uUser,
    validToken,
    allTypeDoc
}