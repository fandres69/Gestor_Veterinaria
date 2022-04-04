/**Controlador carga de archivos */

const {response}=require('express');
const {pool}=require('../database/database');
const {StatusCodes}= require('http-status-codes');
const { enumStatus } = require('../response/responseMessages');
const {cImagesPerfil,rImagesPerfil,uImagesPerfil,dImagesPerfil,qImagesPerfil}=require('../models/imagesperfil');

const LoadUserFile=async(req,res=response)=>{
    try {
       const {documento}=req.params;
       console.log(req);
       const name=req.file.filename;      
       const imgPerfil= await pool.query(rImagesPerfil,[documento]);
       if(imgPerfil.length==0){
           await pool.query(cImagesPerfil,[documento,name]);
       }else if(imgPerfil.length>0){
           await pool.query(uImagesPerfil,[name,documento]);
       }    

     res.status(200).json({
         OK:true,
         statusDescription:'Imagen cargada',
         nombre:name
     });
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            OK:enumStatus.err,
            statusDescription:'Error al cargar archivo'
        });
    }
}


const getUserFile=async(req,res=response)=>{
    try {
        const {documento}=req.params;
        const imgPerfil= await pool.query(rImagesPerfil,[documento]);
        if(imgPerfil.length===0){
            return res.status(StatusCodes.CONFLICT).json({
                OK:enumStatus.err,
                statusDescription:'El archivo no existe'
            });
        }
        return res.status(StatusCodes.OK).json({
            OK:enumStatus.ok,
            statusDescription:'Archivo encontrado',
            nombre:imgPerfil[0].nombre
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            OK:enumStatus.err,
            statusDescription:'Error al consultar archivo'
        });
    }
}

module.exports={
    LoadUserFile,getUserFile
}