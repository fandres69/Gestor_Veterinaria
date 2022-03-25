const enumStatus={
    ok:true,
    err:false
}

const enumMsgLogin={
    U_NOT_EXISTED:'El usuario no existe',
    U_LOGIN_SUCCESS:'Login correcto',
    DOC_EXISTED:'Documento ya existe',
    EMAIL_EXISTED:'Email ya registrado',
    U_CREATE_SUCCESS:'Usuario creado correctamente',
    U_ERR_CREATE:'Error al crear usuario',
    U_ERR_PASSWORD:'Password erróneo',
    TOKEN_VALID:'Token valido',
    TOKEN_INVALID:'Token invalido',
}

module.exports={enumStatus,enumMsgLogin}