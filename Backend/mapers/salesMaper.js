/**Mapea las peticiones  de creación y actualización de producto*/


const {salesOrder,salesDetail}=require('../models/sales');


//#region salesOrder (Pedidos)


/**
 * Retorna un modelo de pedido para creación a partir de un request
 * @param {require} req 
 * @returns Object
 */
const getSalesOrdForCreate=(req)=>{
    const{cliente,direccionEntrega,ciudad,observaciones}=req.body;
    const nSalesOrder={...salesOrder};
    nSalesOrder.cliente=cliente;
    nSalesOrder.direccionEntrega=direccionEntrega;
    nSalesOrder.ciudad=ciudad;
    nSalesOrder.observaciones=observaciones;
    return nSalesOrder;
}

/**
 * Retorna un modelo de pedido para actualización a partir de un request
 * @param {require} req 
 * @returns Object
 */
const getSalesOrdForUpdate=(req)=>{
    const{cliente,direccionEntrega,ciudad,observaciones,idpedidos}=req.body;
    const nSalesOrder={...salesOrder};
    nSalesOrder.cliente=cliente;
    nSalesOrder.direccionEntrega=direccionEntrega;
    nSalesOrder.ciudad=ciudad;
    nSalesOrder.observaciones=observaciones;
    nSalesOrder.idpedidos=idpedidos;
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
    const{producto,cantidad,precio,impuesto,cliente,ciudad,pedido,tipoProducto,anio,mes,dia}=req.body;
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
    return nSalesDetail;
}

/**
 *  Retorna un modelo de detalle pedido a partir de una petición
 * @param {require} req 
 * @returns Object
 */
const getSalesDetailForUpdate=(req)=>{
    const{producto,cantidad,precio,impuesto,cliente,ciudad,pedido,tipoProducto,anio,mes,dia,iddetallePedido}=req.body;
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
    nSalesDetail.iddetallePedido=result[0].iddetallePedido;
    return nSalesDetail;
}

//#endregion

module.exports={
    getSalesOrdForCreate,
    getSalesOrdForUpdate,
    getSalesOrdFromQuery,
    getSalesDetailForCreate,
    getSalesDetailForUpdate,
    getSalesDetailFromQuery
}