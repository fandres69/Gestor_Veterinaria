/**Mapea las peticiones  de creación y actualización de producto*/


const {salesOrder}=require('../models/pedidos');
const {salesDetail}=require('../models/detallePedido');
const {devoluciones}=require('../models/devoluciones');

//#region salesOrder (Pedidos)


/**
 * Retorna un modelo de pedido para creación a partir de un request
 * @param {require} req 
 * @returns Object
 */
const getSalesOrdForCreate=(req)=>{
    const{cliente,direccionEntrega,ciudad,observaciones,dia,mes,anio}=req.body;
    const nSalesOrder={...salesOrder};
    nSalesOrder.cliente=cliente;
    nSalesOrder.direccionEntrega=direccionEntrega;
    nSalesOrder.ciudad=ciudad;
    nSalesOrder.observaciones=observaciones;
    nSalesOrder.dia=dia;
    nSalesOrder.mes=mes;
    nSalesOrder.anio=anio;
    return nSalesOrder;
}

/**
 * Retorna un modelo de pedido para actualización a partir de un request
 * @param {require} req 
 * @returns Object
 */
const getSalesOrdForUpdate=(req)=>{
    const{cliente,direccionEntrega,ciudad,observaciones,idpedidos,dia,mes,anio}=req.body;
    const nSalesOrder={...salesOrder};
    nSalesOrder.cliente=cliente;
    nSalesOrder.direccionEntrega=direccionEntrega;
    nSalesOrder.ciudad=ciudad;
    nSalesOrder.observaciones=observaciones;
    nSalesOrder.idpedidos=idpedidos;
    nSalesOrder.dia=dia;
    nSalesOrder.mes=mes;
    nSalesOrder.anio=anio;
    return nSalesOrder;
}

/**
 * Retorna un modelo de pedido a partir de un query
 * @param {require} result 
 * @returns Object
 */
const getSalesOrdFromQuery=(result)=>{
   
    const nSalesOrder={...salesOrder};
    nSalesOrder.cliente=result[0].cliente;
    nSalesOrder.direccionEntrega=result[0].direccionEntrega;
    nSalesOrder.ciudad=result[0].ciudad;
    nSalesOrder.observaciones=result[0].observaciones;
    nSalesOrder.idpedidos=result[0].idpedidos;
    nSalesOrder.dia=result[0].dia;
    nSalesOrder.mes=result[0].mes;
    nSalesOrder.anio=result[0].anio;
    return nSalesOrder;
}

//#endregion

//#region SalesDetail detallepedidio

/**
 * Retorna un modelo de detalle pedido a partir de una petición
 * @param {require} req 
 * @returns Object
 */
const getSalesDetailForCreate=(req)=>{
    const{producto,cantidad,precio,impuesto,cliente,ciudad,pedido,tipoProducto,anio,mes,dia, descuento}=req.body;
    const nSalesDetail={...salesDetail};
    nSalesDetail.producto=producto;
    nSalesDetail.cantidad=cantidad;
    nSalesDetail.precio=precio;
    nSalesDetail.impuesto=impuesto;
    nSalesDetail.cliente=cliente;
    nSalesDetail.ciudad=ciudad;
    salesDetail.pedido=pedido;
    nSalesDetail.tipoProducto=tipoProducto;
    nSalesDetail.anio=anio;
    nSalesDetail.mes=mes;
    nSalesDetail.dia=dia;
    nSalesDetail.descuento=descuento;
    return nSalesDetail;
}

/**
 *  Retorna un modelo de detalle pedido a partir de una petición
 * @param {require} req 
 * @returns Object
 */
const getSalesDetailForUpdate=(req)=>{
    const{producto,cantidad,precio,impuesto,cliente,ciudad,pedido,tipoProducto,anio,mes,dia,iddetallePedido,descuento}=req.body;
    const nSalesDetail={...salesDetail};
    nSalesDetail.producto=producto;
    nSalesDetail.cantidad=cantidad;
    nSalesDetail.precio=precio;
    nSalesDetail.impuesto=impuesto;
    nSalesDetail.cliente=cliente;
    nSalesDetail.ciudad=ciudad;
    salesDetail.pedido=pedido;
    nSalesDetail.tipoProducto=tipoProducto;
    nSalesDetail.anio=anio;
    nSalesDetail.mes=mes;
    nSalesDetail.dia=dia;
    nSalesDetail.descuento=descuento;
    nSalesDetail.iddetallePedido=iddetallePedido;
    return nSalesDetail;
}


/**
 *  Retorna un modelo de detalle pedido a partir del resultado de una consulta
 * @param {require} req 
 * @returns Object
 */
 const getSalesDetailFromQuery=(result)=>{1
    const nSalesDetail={...salesDetail};
    nSalesDetail.producto=result[0].producto;
    nSalesDetail.cantidad=result[0].cantidad;
    nSalesDetail.precio=result[0].precio;
    nSalesDetail.impuesto=result[0].impuesto;
    nSalesDetail.cliente=result[0].cliente;
    nSalesDetail.ciudad=result[0].ciudad;
    salesDetail.pedido=result[0].pedido;
    nSalesDetail.tipoProducto=result[0].tipoProducto;
    nSalesDetail.anio=result[0].anio;
    nSalesDetail.mes=result[0].mes;
    nSalesDetail.dia=result[0].dia;
    nSalesDetail.descuento=result[0].descuento;
    nSalesDetail.iddetallePedido=result[0].iddetallePedido;
    return nSalesDetail;
}

//#endregion

//#region Devoluciones

/**
 * Retorna modelo de devoluciones a partir de un request
 * @param {request} req 
 * @returns Object
 */
const getDevolucionesFromRequest=(req)=>{
    const nDev={...devoluciones};
    const {iddevoluciones,pedido,producto,cantidad,precio,impuesto,observaciones,descuento}=req.body;
    nDev.iddevoluciones=iddevoluciones;
    nDev.pedido=pedido;
    nDev.producto=producto;
    nDev.cantidad=cantidad;
    nDev.precio=precio;
    nDev.impuesto=impuesto;
    nDev.observaciones=observaciones;
    nDev.descuento=descuento;
    return nDev;
}

/**
 * Retorna modelo de devoluciones a partir del resultado de una consulta
 * @param {query} result 
 * @returns Object
 */
 const getDevolucionesFromQuery=(result)=>{
    const nDev={...devoluciones};
    nDev.iddevoluciones=result[0].iddevoluciones;
    nDev.pedido=result[0].pedido;
    nDev.producto=result[0].producto;
    nDev.cantidad=result[0].cantidad;
    nDev.precio=result[0].precio;
    nDev.impuesto=result[0].impuesto;
    nDev.observaciones=result[0].observaciones;
    nDev.descuento=result[0].descuento;
    return nDev;
}

//#endregion

module.exports={
    getSalesOrdForCreate,
    getSalesOrdForUpdate,
    getSalesOrdFromQuery,
    getSalesDetailForCreate,
    getSalesDetailForUpdate,
    getSalesDetailFromQuery,
    getDevolucionesFromRequest,
    getDevolucionesFromQuery
}