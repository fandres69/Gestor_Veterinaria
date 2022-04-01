export interface DataMasterInterface {

}

export interface CiudadResponse{
    OK?:boolean;
    error?:{};
    statusCode?:number;
    statusDescription?:string,
    ciudades?:ciudadModel[];

}

export interface ciudadModel{
    codigo:string;
    Ciudad:string;
    codigoDto:string;
    Departamento:string;
}

export interface tipoDocumentoResponse{
    OK?:boolean;
    error?:{};
    statusCode?:number;
    statusDescription?:string,
    tipoDocumento?:tipoDocumentoModel[];
}

export interface tipoDocumentoModel{
    idtipoDocumento:number,
    tipoDocumento:string
}