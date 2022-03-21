/**Mapea las peticiones  de creación y actualización de usuario*/

const {usuario}= require('../models/usuarios');


/**
 * Mapea una petición a un objeto usuario
 * @param {require} req 
 * @returns Objeto Usuario
 */
const getUserToCreate=(req)=>{
    const {tipoDocumento,documento,nombre,email,celular,password,usuarioN} = req.body;   
    const nUsuario= {...usuario};
    nUsuario.tipoDocumento=tipoDocumento;
    nUsuario.documento=documento;
    nUsuario.nombre=nombre;
    nUsuario.email=email;
    nUsuario.celular=celular;
    nUsuario.password=password;
    nUsuario.usuario=usuarioN;
    return nUsuario;
}

const getUserToUpdate=(req)=>{
    const {tipoDocumento,documento,nombre,email,celular,password,usuarioN,activo} = req.body;   
    const nUsuario= {...usuario};
    nUsuario.tipoDocumento=tipoDocumento;
    nUsuario.documento=documento;
    nUsuario.nombre=nombre;
    nUsuario.email=email;
    nUsuario.celular=celular;
    nUsuario.password=password;
    nUsuario.usuario=usuarioN;
    nUsuario.activo=activo;
    return nUsuario;
}

/**
 * Mapea una petición de login de un usuario
 * @param {require} req 
 * @returns Objeto Usuario
 */
const getUserLogin=(req)=>{
    const{password,usuarioN}=req.body
    const nUser={...usuario};
    nUser.password=password;
    nUser.usuario=usuarioN;
    return nUser;
}

module.exports={
    getUserToCreate,
    getUserLogin,
    getUserToUpdate
}