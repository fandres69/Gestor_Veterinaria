
/**Modelo y consultas DB tabla gveterinaria.mascotas*/

/**mODELO TABLA gveterinaria.mascotas*/
const mascotas={
    idmascotas:0,
    propietario:0,
    nombre:"",
    tipo:""
}

/**
 * Crea una mascota en la DB
 * @param propietario
 * @param nombre
 * @param tipo
 */
const cMascotas='INSERT INTO gveterinaria.mascotas (propietario,nombre,tipo) VALUES (?,?,?);';
/**
 * Consulta una mascota en la DB
 * @param idmascotas
 */
const rMascotas='SELECT * FROM gveterinaria.mascotas WHERE idmascotas=?;';

/**
 * Actualiza una mascota en DB
 * @param propietario
 * @param nombre
 * @param tipo
 * @param idmascotas
 */
const uMascotas='UPDATE  gveterinaria.mascotas SET propietario=?,nombre=?,tipo=? WHERE idmascotas=?;';
/**
 *Elimina una mascota de la DB 
 */
const dMascotas='DELETE FROM gveterinaria.mascotas WHERE idmascotas=?;';
/**
 * Consulta genérica tabla mascotas
 */
const qMascotas='SELECT * FROM gveterinaria.mascotas';



module.exports={
  
    mascotas,
    cMascotas,
    rMascotas,
    uMascotas,
    dMascotas,
    qMascotas,
}