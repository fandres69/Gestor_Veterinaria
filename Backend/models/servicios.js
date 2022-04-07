/**Modelo y consultas DB tabla gveterinaria.servicios*/

/**
 * Modelo tabla gveterinaria.servicios
 */
const serviciosV={
    idServicios:0,
    servicio:"",
    descripcion:"",
    precio:0,
    impuesto:0,
    descuento:0
}


/**
 * Crea un registro de servicios en la DB
 * @param servicio
 * @param descripcion
 * @param precio
 * @param impuesto
 * @param descuento
 */
const cService='INSERT INTO gveterinaria.servicios (servicio,descripcion,precio,impuesto,descuento) VALUES (?,?,?,?,?);';

/**
 * Consulta un servicio en la DB
 * @param idServicios
 */
const rService='SELECT * FROM gveterinaria.servicios WHERE idServicios=?;';

/**
 * Actualiza un servicio en la DB
 * @param servicio
 * @param descripcion
 * @param precio
 * @param impuesto
 * @param descuento
 * @param idServicios
 */
const uService='UPDATE gveterinaria.servicios SET servicio=?,descripcion=?,precio=?,impuesto=?,descuento=? WHERE idServicios=?;';

/**
 * Elimina un servio en la DB
 * @param idServicios
 */
const dService='DELETE FROM gveterinaria.servicios WHERE idServicios=?;';

/**
 * Consulta genérica servicio
 */
const qService='SELECT * FROM gveterinaria.servicios';

module.exports={
    cService,
    rService,
    uService,
    dService,
    qService,
    serviciosV
}