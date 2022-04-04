/**Modelo response API productos */
export interface ProductosResponse {
    OK?:boolean;
    error?:{};
    statusCode?:number;
    statusDescription?:string;
    productos?:ProductoModel[];
}

/**Modelo producto */
export interface ProductoModel{
    idProductos?:number;
    producto?:string;
    ciudad?:string;
    presentacion?:string;
    unEmpaque?:number;
    descripcion?:string;
}

/**Modelo response API inventarios */
export interface StocksResponse {
    OK?:boolean;
    error?:{};
    statusCode?:number;
    statusDescription?:string;
    stocks?:StockModel[];
}

/**Modelo inventarios */
export interface StockModel{
    idInventario?:number;
    producto?:number;
    stock?:number;
    stockMin?:number;
    stockMax?:number;
    PrecioVenta?:number;
    impuesto?:number;
    descuento?:number;
}


/**Modelo response API inventarios */
export interface ServiciosResponse {
    OK?:boolean;
    error?:{};
    statusCode?:number;
    statusDescription?:string;
    servicios?:ServiciosModel[];
}

/**Modelo inventarios */
export interface ServiciosModel{
    idServicios?:number;
    servicio?:string;
    descripcion?:string;
    precio?:number;    
    impuesto?:number;
    descuento?:number;
}


/**Modelo response API inventarios */
export interface IngresosInvResponse {
    OK?:boolean;
    error?:{};
    statusCode?:number;
    statusDescription?:string;
    entradas?:IngresosInvModel[];
}

/**Modelo inventarios */
export interface IngresosInvModel{
    idingresosInventario?:number;
    producto?:number;
    cantidad?:number;
    Precio?:number;    
    dia?:number;
    mes?:number;
    anio?:number;
}