const {response}=require('express');
const bcrypt=require('bcryptjs');
const {pool}=require('../database/database');

const creareUser=async(req,res=response)=>{
    const{nombre,email,telefono,documento,tipoDocumento,passwprd}=req.body;
    try {
       
    } catch (error) {
        res.status(500).json({
            status:'error',
            msg:'Error al crear usuario',
            code:500
        });
    }
}
/**Consulta un usuario de la BD */
const qUser=async(req,res=response)=>{
  try {
      const {usuario,password}=req.body;
      console.log(usuario,password);
     const resultado= await pool.query('select * from usuarios where nombre =?',[usuario]);
     res.status(200).json({
         "usuario":resultado
     })
  } catch (error) {
      
  }
}


module.exports={
    creareUser,
    qUser
}