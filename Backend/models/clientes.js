/**Modelo y consultas DB tabla gveterinaria.clientes*/


/**Modelo tabla gveterinaria.clientes*/
const cliente={
    documento:0,
    tipodocumento:0,
    nombre:"",
    celular:0,
    direccion:"",
    ciudad:0,
    email:""
}

/**
 * Crea un cliente en la DB
 * @param documento
 * @param tipodocumento
 * @param nombre
 * @param celular
 * @param direccion
 * @param ciudad
 * @param email
 */
const cClientes='INSERT INTO gveterinaria.clientes (documento,tipodocumento,nombre,celular,direccion,ciudad,email) VALUES (?,?,?,?,?,?,?);';
/**
 * Consulta un cliente en la DB
 * @param documento
 */
const rClientes='SELECT * FROM gveterinaria.clientes WHERE documento=?;';

/**
 * Crea un cliente en la DB
 * @param tipodocumento
 * @param nombre
 * @param celular
 * @param direccion
 * @param ciudad
 * @param email
 * @param documento
 */
const uClientes='UPDATE gveterinaria.clientes SET tipodocumento=?,nombre=?,celular=?,direccion=?,ciudad=?,email=? WHERE documento=?;';

/**
 * Elimina un cliente en la DB
 * @param documento
 */
const dClientes='DELETE FROM gveterinaria.clientes WHERE documento=?;';

/**
 * Consulta genérica tabla clientes
 */
const qClientes='SELECT * FROM gveterinaria.clientes';


module.exports={
    cliente,
    cClientes,
    rClientes,
    uClientes,
    dClientes,
    qClientes,
   
}