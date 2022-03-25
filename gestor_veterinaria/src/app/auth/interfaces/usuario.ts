export interface AuthResponse {
    OK:boolean,
    statusCode:number,
    statusDescription:string,
    usuario?:string,
    token?:string
}

export interface responseApi{
    OK:boolean,
    statusCode:number,
    statusDescription:string,
    detail?:detail
}

export interface Usuario{
    usuario?: string;
    token?:   string;
}
export interface detail{
    usuario?:string,
    token?:string
}

export interface TokenValid{
    OK?:boolean,
    statusCode:number,
    statusDescription:string
}