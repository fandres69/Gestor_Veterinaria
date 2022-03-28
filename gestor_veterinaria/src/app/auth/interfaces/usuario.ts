export interface AuthResponse {
    OK:boolean,
    statusCode:number,
    statusDescription:string,
    usuario?:string,
    token?:string,
    id?:string
}

// export interface responseApi{
//     OK:boolean,
//     statusCode:number,
//     statusDescription:string,
//     detail?:detail
// }

export interface Usuario{
    documento?:number;
    nombre?:string;
    tipoDocumento?:number;
    celular?:number;
    email?:string;
    password?:string;
    usuario?:string;
}
export interface detail{
    usuario?:string,
    token?:string
}

export interface TokenValid{
    OK?:boolean,
    statusCode:number,
    statusDescription:string,
    errors?:{}
}

/**Modelo respuesta consulta usuario se session */
export interface userSessionFind{
    OK?:boolean;
    statusCode?:number,
    statusDescription?:string,
    documento?: number;
    nombre?:   string;
    tipoDocumento?:number;
    celular?:number;
    email?:string;
    password?:string;
    usuario?:string;
}