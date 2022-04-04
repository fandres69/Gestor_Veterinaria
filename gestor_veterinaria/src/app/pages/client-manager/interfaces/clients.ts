export interface ClientsGV {
    documento?:number,
    tipodocumento?:number,
    nombre?:string,
    celular?:number,
    direccion?:string,
    ciudad?:string,
    email?:string

}

export interface ClientResponse{
    OK?:boolean;
    error?:{};
    statusCode?:number;
    statusDescription?:string,
    clientes?:ClientsGV[];
}

export interface Mascotas{
    idmascotas?:number,
    propietario?:number,
    nombre?:string,
    tipo?:string
}

export interface PetsResponse{
    OK?:boolean;
    error?:{};
    statusCode?:number;
    statusDescription?:string,
    mascotas?:Mascotas[];
}