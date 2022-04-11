export interface PedidoResponse {
    OK?:boolean;
    error?:{};
    statusCode?:number;
    statusDescription?:string;
    salesOrders?:PedidoModel[];
}

export interface PedidoModel {
    idpedidos?:number;
    cliente?:number;
    direccionEntrega?:string;
    ciudad?:string;
    observaciones?:string;
    dia?:number;
    mes?:number;
    anio?:number;

}

export interface ViewInvResponse{
    OK?:boolean;
    error?:{};
    statusCode?:number;
    statusDescription?:string;
    detalleInv?:DetalleInvModel[];
}

/**Modelo vista de inventario */
export interface DetalleInvModel{
    idProductos?:number;
    producto?:string; 
    PrecioVenta?:number;
    impuesto?:number;
    descuento?:number;
    stock?:number;
}


export interface DetallePedidoResponse {
    OK?:boolean;
    error?:{};
    statusCode?:number;
    statusDescription?:string;
    OrderDetail?:DetallePedModel[];
}

export interface DetallePedModel {
    iddetallePedido?:number;
    producto?:number;
    cantidad?:number;
    precio?:number;
    impuesto?:number;
    cliente?:number;
    ciudad?:string;
    pedido?:number;
    tipoProducto?:string;
    dia?:number;
    mes?:number;
    anio?:number;
    descuento?:number;
}

export interface DevolucionesResponse {
    OK?:boolean;
    error?:{};
    statusCode?:number;
    statusDescription?:string;
    devoluciones?:DevolucionesModel[];
}

export interface DevolucionesModel {
    iddevoluciones?:number;
    pedido?:number;
    producto?:number;
    cantidad?:number;
    precio?:number;
    impuesto?:number;
    observaciones?:string;
    unidades?:number;
    descuento?:number;    
}

export interface VistaPedidos{
    idpedidos?:number;
    documento?:number;
    nombre?:string;
    direccionEntrega?:string;
    ciudad?:string;
    ciudadN?:string;
    observaciones?:string;
    fecha:Date;
}

export interface VistaDetalle{
    iddetallePedido?:number;
    producto?:number;
    productoName?:string;
    cantidad?:number;
    precio?:number;
    impuesto?:number;
    clienteDoc?:number;
    clienteName?:string;
    ciudad?:string;
    ciudadName?:string;
    pedido?:number;
    tipoProducto?:string;
    subTotal?:number;
    subTotalImpuesto?:number;
    subTotalDescuento?:number;
    total?:number;
    anio?:number;
    mes?:number;
    dia?:number;
    descuento?:number;
}