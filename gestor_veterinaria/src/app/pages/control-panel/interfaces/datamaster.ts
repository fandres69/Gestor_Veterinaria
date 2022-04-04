export interface Datamaster {
}

export interface typeDocumentsRes{
    result:[
        {idtipoDocumento:number,tipoDocumento:string}
    ]
}

export interface userImgResponse{
    OK?:boolean,
    statusDescription?:string,
    nombre?:string
}

export interface passwordChanged{
    OK?:boolean,
    statusCode:number,
    statusDescription?:string,
}