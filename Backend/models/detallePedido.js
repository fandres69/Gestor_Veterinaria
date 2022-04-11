/**Modelo y consultas DB gveterinaria.detallepedidos*/


//#region detallepedidio

/**
 * Modelo tabla gveterinaria.detallepedidos
 */
 const salesDetail={
    iddetallePedido:0,
    producto:0,
    cantidad:0,
    precio:0,
    impuesto:0,
    cliente:0,
    ciudad:0,
    pedido:0,
    tipoProducto:"",
    anio:0,
    mes:0,
    dia:0,
    unidades:0,
    descuento:0
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
 * @param unidades
 * @param descuento
 */
const cSalesDetail='INSERT INTO gveterinaria.detallepedidos (producto,cantidad,precio,impuesto,cliente,ciudad,pedido,tipoProducto,anio,mes,dia,unidades,descuento) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);';

/**
 * Consulta un registro de detalle pedido (Vetas)
 * @param iddetallePedido
 */
const rSalesDetail='SELECT * FROM gveterinaria.detallepedidos WHERE iddetallePedido=?;';

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
 * @param unidades
 * @param descuento
 * @param iddetallePedido
 */
const uSalesDetail='UPDATE gveterinaria.detallepedidos SET producto=?,cantidad=?,precio=?,impuesto=?,cliente=?,ciudad=?,pedido=?,tipoProducto=?,anio=?,mes=?,dia=?,descuento=? WHERE iddetallePedido=?;';

/**
 * Consulta un registro de detalle pedido (Vetas)
 * @param iddetallePedido
 */
const dSalesDetail='DELETE FROM gveterinaria.detallepedidos WHERE iddetallePedido=?;';

/**
 * Consulta genérica registro de detalle pedido (Vetas)
 */
const qSalesDetail='SELECT * FROM gveterinaria.detallepedidos';

/**COnsulta la vista v_detallesinv */
const vewDetalleInv='SELECT * FROM gveterinaria.v_detallesinv';

//#endregion




module.exports={   
    salesDetail,
    cSalesDetail,
    rSalesDetail,
    uSalesDetail,
    dSalesDetail,
    qSalesDetail,
    vewDetalleInv
}