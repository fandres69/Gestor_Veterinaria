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