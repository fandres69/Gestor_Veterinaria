/**Modelo y consultas DB tabla gveterinaria.ciudad*/

/**
 * Modelo tabla gveterinaria.ciudad
 */
const ciudad={
    codigo:0,
    Ciudad:"",
    codigoDto:0,
    Departamento:""
}

/**
 * Crea un registro ciudad en la DB
 * @param codigo
 * @param Ciudad
 * @param codigoDto
 * @param Departamento
 */
const cCiudad='INSERT INTO gveterinaria.ciudad (codigo,Ciudad,codigoDto,Departamento) VALUES (?,?,?,?);';
/**
 * Consulta un registro ciudad en la DB
 * @param codigo
 */
const rCiudad='SELECT * FROM gveterinaria.ciudad WHERE codigo=?;';
/**
 * actualiza un registro ciudad en la DB
 * @param Ciudad
 * @param codigoDto
 * @param Departamento
 * @param codigo
 */
const uCiudad='UPDATE gveterinaria.ciudad SET Ciudad=?,codigoDto=?,Departamento=? WHERE codigo=?;';
/**
 * Elimina un registro ciudad en la DB
 * @param codigo
 */
const dCiudad='DELETE FROM gveterinaria.ciudad WHERE codigo=?;';

/**
 * Consulta genérica tabla ciudad
 */
const qCiudad='SELECT * FROM gveterinaria.ciudad';


module.exports={
    ciudad,
    cCiudad,
    rCiudad,
    uCiudad,
    dCiudad,
    qCiudad,
}