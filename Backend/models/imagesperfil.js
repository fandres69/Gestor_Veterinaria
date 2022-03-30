const imagesPerfil={
usuario:0,
nombre:''
}

/**
 * Crea un registro para el nombre de la imagen de perfil de un usuario
 * @param usuario
 * @param nombre
 */
const cImagesPerfil='INSERT INTO gveterinaria.imagesperfil (usuario,nombre) VALUES (?,?);';
/**
 * Consulta un registro para el nombre de la imagen de perfil de un usuario
 * @param usuario
 */
const rImagesPerfil='SELECT * FROM gveterinaria.imagesperfil WHERE usuario=?;';

/**
 * Actualiza un registro para el nombre de la imagen de perfil de un usuario
 * @param usuario
 * @param nombre
 */
const uImagesPerfil='UPDATE gveterinaria.imagesperfil SET nombre=? WHERE usuario=?;';

/**
 * Elimina un registro para el nombre de la imagen de perfil de un usuario
 * @param usuario
 * @param nombre
 */
const dImagesPerfil='DELETE FROM gveterinaria.imagesperfil WHERE usuario=?;';

/**
 * Consulta genérica para el nombre de la imagen de perfil de un usuario
 */
const qImagesPerfil='SELECT * FROM gveterinaria.imagesperfil';

module.exports={
    imagesPerfil,
    cImagesPerfil,
    rImagesPerfil,
    uImagesPerfil,
    dImagesPerfil,
    qImagesPerfil,
}