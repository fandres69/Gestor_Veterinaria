/**Modelo y consultas DB tabla gveterinaria.usuarios*/

/**Modelo usuario tabla  gveterinaria.usuarios*/
const usuario={
    tipoDocumento:0,     
    documento:0,
    nombre:"",
    email:"",
    celular:0,
    password:"",
    usuario:"",
    activo:0
}

/**Consulta para creación de usuarios en la DB 
 *@param documento
 *@param nombre
 *@param tipoDocumento
 *@param celular
 *@param email
 *@param password
 *@param usuario
 *@param activo
*/
const qCreate=`INSERT INTO gveterinaria.usuarios(documento,nombre,tipoDocumento,celular,email,password,usuario,activo) VALUES(?,?,?,?,?,?,?,1);`;

/**
 * Login de usuario
 * @param usuario
 */
const qLogin=`SELECT * FROM gveterinaria.usuarios where usuario=?;`;

/**
 * Consulta de un usuario
 * @param documento
 */
const qQueryUser=`SELECT * FROM gveterinaria.usuarios where documento=?;`

/**
 * Eliminación de un usuario
 * @param documento
 */
const qDeleteUser=` DELETE FROM gveterinaria.usuarios where documento=?`

/**
 * Actualiza un usuario en la BD
 *@param nombre
 *@param tipoDocumento
 *@param celular
 *@param email
 *@param password
 *@param usuario
 *@param activo
 *@param documento
 */
const qUpdateUser=`UPDATE gveterinaria.usuarios SET nombre=?, tipoDocumento=?,celular=?,email=?,password=?,usuario=?,activo=? WHERE documento=?`

/**
 * Consulta genérica para tabla gveterinaria.usuarios
 */
const qQueryGeneric=`SELECT * FROM gveterinaria.usuarios`;

module.exports={
    usuario,
    qCreate,
    qQueryUser,
    qDeleteUser,
    qUpdateUser,
    qQueryGeneric,
    qLogin
}