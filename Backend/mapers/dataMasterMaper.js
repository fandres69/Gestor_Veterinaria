/**Mapea las peticiones de tipo de documentos y ciudad */

const {tipodocumento}=require('../models/tipodocumento');
const {ciudad}=require('../models/ciudad');

/**
 * Retorna modelo tipo documento a partir de un request
 * @param {request} req 
 * @returns Object
 */
const getTypeDocumentFromRequest=(req)=>{
    const {idtipoDocumento,tipoDocumento}=req.body;
    const nTipoDocument={...tipodocumento}
    nTipoDocument.idtipoDocumento=idtipoDocumento;
    nTipoDocument.tipoDocumento=tipoDocumento;
    return nTipoDocument;

}


/**
 * Retorna modelo tipo documento a partir del resultado de un query
 * @param {query} result 
 * @returns Object
 */
const getTypeDocumentFromQuery=(result)=>{
    const nTipoDocument={...tipodocumento}
    nTipoDocument.idtipoDocumento=result[0].idtipoDocumento;
    nTipoDocument.tipoDocumento=result[0].tipoDocumento;
    return nTipoDocument;
}

/**
 * Retorna modelo ciudad a partir de un request
 * @param {request} req 
 * @returns Object
 */
const getCiudadFromRequest=(req)=>{
    const nCiudad={...ciudad};
    const {codigo,Ciudad,codigoDto,Departamento}= req.body;
    nCiudad.codigo=codigo;
    nCiudad.Ciudad=Ciudad;
    nCiudad.codigoDto=codigoDto;
    nCiudad.Departamento=Departamento;    
    return nCiudad;
}

/**
 * Retorna modelo ciudad a partir del resultado de un query
 * @param {query} result 
 * @returns Object
 */
const getCiudadFromQuery=(result)=>{
    const nCiudad={...ciudad};
    nCiudad.codigo=result[0].codigo;
    nCiudad.Ciudad=result[0].Ciudad;
    nCiudad.codigoDto=result[0].codigoDto;
    nCiudad.Departamento=result[0].Departamento;    
    return nCiudad;
}

module.exports={
    getTypeDocumentFromQuery,
    getTypeDocumentFromRequest,
    getCiudadFromRequest,
    getCiudadFromQuery
}