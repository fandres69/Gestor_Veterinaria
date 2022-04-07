/**Modelo y consultas DB gveterinaria.devoluciones*/


/**
 * Modelo tabla gveterinaria.devoluciones
 */
const devoluciones={
    iddevoluciones:0,
    pedido:0,
    producto:0,
    cantidad:0,
    precio:0,
    impuesto:0,
    observaciones:""
}
/**
 * Crea un registro de devoluciones en la DB
 * @param pedido
 * @param producto
 * @param cantidad
 * @param precio
 * @param impuesto
 * @param observaciones
 */
const cDevoluciones='INSERT INTO gveterinaria.devoluciones (pedido,producto,cantidad,precio,impuesto,observaciones) VALUES (?,?,?,?,?,?);';

/**
 * Consulta un registro de devoluciones en la DB
 * @param iddevoluciones
 */
const rDevoluciones='SELECT * FROM gveterinaria.devoluciones WHERE iddevoluciones=?;';

/**
 * Actualiza un registro de devoluciones en la DB
 * @param pedido
 * @param producto
 * @param cantidad
 * @param precio
 * @param impuesto
 * @param observaciones
 * @param iddevoluciones
 */
const uDevoluciones='UPDATE gveterinaria.devoluciones SET pedido=?,producto=?,cantidad=?,precio=?,impuesto=?,observaciones=? WHERE iddevoluciones=?;';

/**
 * Elimina un registro de devoluciones en la DB
 * @param iddevoluciones
 */
const dDevoluciones='DELETE FROM gveterinaria.devoluciones WHERE iddevoluciones=?;';

/**
 * Consulta genérica para tabla devoluciones
 */
const qDevoluciones='SELECT * FROM gveterinaria.devoluciones';

module.exports={
    devoluciones,
    cDevoluciones,
    rDevoluciones,
    uDevoluciones,
    dDevoluciones,
    qDevoluciones,
}