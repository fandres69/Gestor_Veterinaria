/**Modelo y consultas DB gveterinaria.tipodocumento*/

/**
 * Modelo tabla gveterinaria.tipodocumento
 */
const tipodocumento={
    idtipoDocumento:0,
    tipoDocumento:""
}

/**
 * Crea un registro tipodocumento en la DB
 * @param tipoDocumento
 */
const cTipoDocumento='INSERT INTO gveterinaria.tipodocumento (tipoDocumento) VALUES (?);';

/**
 * Consulta un registro tipodocumento en la DB
 * @param idtipoDocumento
 */
const rTipoDocumento='SELECT * FROM gveterinaria.tipodocumento WHERE idtipoDocumento=?; ';
/**
 * Actualiza un registro tipodocumento en la DB
 * @param tipoDocumento
 * @param idtipoDocumento
 */
const uTipoDocumento='UPDATE gveterinaria.tipodocumento SET tipoDocumento=? WHERE idtipoDocumento=?;';

/**
 * Elimina un registro tipodocumento en la DB
 * @param idtipoDocumento
 */
const dTipoDocumento='DELETE FROM gveterinaria.tipodocumento WHERE idtipoDocumento=?;';

/**
 * Consulta genérica tabla tipodocumento
 */
const qTipoDocumento='SELECT * FROM gveterinaria.tipodocumento ';

module.exports={
    tipodocumento,
    cTipoDocumento,
    rTipoDocumento,
    uTipoDocumento,
    dTipoDocumento,
    qTipoDocumento,
}