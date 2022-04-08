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
    ciudad?:number;
    pedido?:number;
    tipoProducto?:string;
    dia?:number;
    mes?:number;
    anio?:number;
    unidades?:number;
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