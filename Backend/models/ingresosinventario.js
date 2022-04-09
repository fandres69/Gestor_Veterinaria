/**Modelo y consultas DB gveterinaria.ingresosinventario*/

/**
 * Modelo tabla gveterinaria.ingresosinventario
 */
const ingresosinventario={
    idingresosInventario:0,
    producto:0,
    cantidad:0,
    Precio:0,
    dia:0,
    mes:0,
    anio:0
}

/**
 * Crea un registro ingresosinventario en la DB
 * @param producto
 * @param cantidad
 * @param Precio
 */
const cIngresosInventario='INSERT INTO gveterinaria.ingresosinventario (producto,cantidad,Precio,dia,mes,anio) VALUES (?,?,?,?,?,?);';

/**
 * Consulta un registro ingresosinventario en la DB
 * @param idingresosInventario
 */
const rIngresosInventario='SELECT * FROM gveterinaria.ingresosinventario WHERE idingresosInventario=?;';

/**
 * Crea un registro ingresosinventario en la DB
 * @param producto
 * @param cantidad
 * @param Precio
 * @param idingresosInventario
 */
const uIngresosInventario='UPDATE gveterinaria.ingresosinventario SET producto=?,cantidad=?,Precio=?,dia=?,mes=?,anio=? WHERE idingresosInventario=?;';

/**
 * Elimina un registro ingresosinventario en la DB
 * @param idingresosInventario
 */
const dIngresosInventario='DELETE FROM gveterinaria.ingresosinventario WHERE idingresosInventario=?;';

/**
 * Consulta genérica tabla ingresosinventario
 */
const qIngresosInventario='SELECT * FROM gveterinaria.ingresosinventario';

module.exports={
    ingresosinventario,
    cIngresosInventario,
    rIngresosInventario,
    uIngresosInventario,
    dIngresosInventario,
    qIngresosInventario
}