/**Modelo y consultas DB tabla gveterinaria.productos*/

/**
 * Modelo tabla gveterinaria.productos
 */
const producto={
    idProductos :0,
    producto:"",
    ciudad:0,
    presentacion:"",
    unEmpaque:0,
    descripcion:""
}

/**
 * Crea un producto en la base de datos
 * @param producto
 * @param ciudad
 * @param presentacion
 * @param unEmpaque
 * @param descripcion
 */
const cProducto='INSERT INTO gveterinaria.productos (producto,ciudad,presentacion,unEmpaque,descripcion) VALUES (?,?,?,?,?);';


/**
 * Actualiza un producto en DB
 * @param producto
 * @param ciudad
 * @param presentacion
 * @param unEmpaque
 * @param descripcion
 * @param idproductos
 */
const uProducto='UPDATE gveterinaria.productos SET producto=?, ciudad=?,presentacion=?,unEmpaque=?,descripcion=? WHERE idproductos=?';


/**
 * Elimina un producto en la DB
 * @param idproductos
 */
const dProducto='DELETE FROM gveterinaria.productos WHERE idproductos=?;';

/**
 * Consulta un producto en la DB
 * @param idproductos
 */
const rProducto='SELECT * FROM gveterinaria.productos WHERE idproductos=?;';

/**
 * Consulta genérica productos
 * 
 */
const qProduct='SELECT * FROM gveterinaria.productos';

module.exports={
    producto,
    cProducto,
    rProducto,
    uProducto,
    dProducto,
    qProduct
}