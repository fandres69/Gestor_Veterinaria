/**Modelo y consultas DB tabla gveterinaria.pedidos y gveterinaria.detallepedidio*/


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


//#region detallepedidio

/**
 * Modelo tabla gveterinaria.detallepedidio
 */
const salesDetail={
    iddetallePedido:0,
    producto:0,
    cantidad:0,
    precio:0.0,
    impuesto:0.0,
    cliente:0,
    ciudad:0,
    pedido:0,
    tipoProducto:"",
    anio:0,
    mes:0,
    dia:0
}

/**
 * Crea un registro de detalla de pedido (Ventas)
 * @param producto
 * @param cantidad
 * @param precio
 * @param impuesto
 * @param cliente
 * @param ciudad
 * @param pedido
 * @param tipoProducto
 * @param anio
 * @param mes
 * @param dia
 */
const cSalesDetail='INSERT INTO gveterinaria.detallepedido (producto,cantidad,precio,impuesto,cliente,ciudad,pedido,tipoProducto,anio,mes,dia) VALUES (?,?,?,?,?,?,?,?,?,?,?);';

/**
 * Consulta un registro de detalle pedido (Vetas)
 * @param iddetallePedido
 */
const rSalesDetail='SELECT * FROM gveterinaria.detallepedido WHERE iddetallePedido=?;';

/**
 * Actualiza un registro de detalla de pedido (Ventas)
 * @param producto
 * @param cantidad
 * @param precio
 * @param impuesto
 * @param cliente
 * @param ciudad
 * @param pedido
 * @param tipoProducto
 * @param anio
 * @param mes
 * @param dia
 * @param iddetallePedido
 */
const uSalesDetail='UPDATE gveterinaria.detallepedido SET producto=?,cantidad=?,precio=?,impuesto=?,cliente=?,ciudad=?,pedido=?,tipoProducto=?,anio=?,mes=?,dia=? WHERE iddetallePedido=?;';

/**
 * Consulta un registro de detalle pedido (Vetas)
 * @param iddetallePedido
 */
const dSalesDetail='DELETE FROM gveterinaria.detallepedido WHERE iddetallePedido=?;';

/**
 * Consulta genérica registro de detalle pedido (Vetas)
 */
const qSalesDetail='SELECT * FROM gveterinaria.detallepedido';

//#endregion

module.exports={
    salesOrder,
    cSalesOrder,
    rSalesOrder,
    uSalesOrder,
    dSalesOrder,
    qSalesOrder,
    salesDetail,
    cSalesDetail,
    rSalesDetail,
    uSalesDetail,
    dSalesDetail,
    qSalesDetail,
}