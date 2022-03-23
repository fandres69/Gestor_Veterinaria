/**Modelo y consultas DB tabla gveterinaria.pedidos*/


//#region  pedidos
/**
 * Modelo tabla gveterinaria.pedidos
 */
const salesOrder={
    idpedidos:0,
    cliente:0,
    direccionEntrega:"",
    ciudad:0,
    observaciones:""
}

/**
 * Crea un pedido en la DB
 * @param cliente
 * @param direccionEntrega
 * @param ciudad
 * @param observaciones
 */
const cSalesOrder='INSERT INTO gveterinaria.pedidos (cliente,direccionEntrega,ciudad,observaciones) VALUES (?,?,?,?);';

/**
 * Consulta un pedido en la base de datos
 * @param idpedidos
 */
const rSalesOrder='SELECT * FROM gveterinaria.pedidos WHERE idpedidos=?;';

/**
 * Actualiza un pedido en la DB
 * @param cliente
 * @param direccionEntrega
 * @param ciudad
 * @param observaciones
 * @param idpedidos
 */
const uSalesOrder='UPDATE gveterinaria.pedidos SET cliente=?,direccionEntrega=?,ciudad=?,observaciones=? WHERE idpedidos=?;';

/**
 * Elimina un pedido en la base de datos
 * @param idpedidos
 */
const dSalesOrder='DELETE FROM gveterinaria.pedidos WHERE idpedidos=?;';

/**
 * Consulta genérica tabla pedidos
 */
const qSalesOrder='SELECT * FROM gveterinaria.pedidos';

//#endregion


module.exports={
    salesOrder,
    cSalesOrder,
    rSalesOrder,
    uSalesOrder,
    dSalesOrder,
    qSalesOrder,
  
}