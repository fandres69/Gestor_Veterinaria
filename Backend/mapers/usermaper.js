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

const getUserFromQuery=(result)=>{
    const qUser={...usuario};
    qUser.documento=result[0].documento;
    qUser.nombre=result[0].nombre;
    qUser.tipoDocumento=result[0].tipoDocumento;
    qUser.celular=result[0].celular;
    qUser.email=result[0].email;
    qUser.password=result[0].password;
    qUser.usuario=result[0].usuario;
    return qUser;
}
module.exports={
    getUserToCreate,
    getUserLogin,
    getUserToUpdate,
    getUserFromQuery
}