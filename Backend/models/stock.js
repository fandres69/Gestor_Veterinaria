/**Modelo y consultas DB tabla gveterinaria.inventario*/


/**
 * Modelo tabla gveterinaria.inventario
 */
 const stockInv={
    idInventario :0,
    producto:0,
    stock:0,
    stockMin:0,
    stockMax:0,
    PrecioVenta:0.0,
    impuesto:0.0,
    descuento:0.0
}

/**
 * Crea un registro de inventario
 * @param producto
 * @param stock
 * @param stockMin
 * @param stockMax
 * @param PrecioVenta
 * @param impuesto
 * @param descuento
 */
const cInventario='INSERT INTO gveterinaria.inventario (producto,stock,stockMin,stockMax,PrecioVenta,impuesto,descuento) VALUES (?,?,?,?,?,?,?);';

/**
 * Consulta un registro inventario
 * @param idInventario
 */
const rInventario='SELECT * FROM gveterinaria.inventario WHERE idInventario=?;';

/**
 * actualiza un registro inventario
 * @param producto
 * @param stock
 * @param stockMin
 * @param stockMax
 * @param PrecioVenta
 * @param impuesto
 * @param descuento
 * @param idInventario
 */
const uInventario='UPDATE gveterinaria.inventario SET producto=?,stock=?,stockMin=?,stockMax=?,PrecioVenta=?,impuesto=?,descuento=? WHERE idInventario=?;';

/**
 * Elimina un registro inventario
 * @param idInventario
 */
const dInventario='DELETE FROM gveterinaria.inventario WHERE idInventario=?;';

/**
 * Consulta genérica inventario
 * 
 */
const qInventario='SELECT * FROM gveterinaria.inventario';


module.exports={
    stockInv,
    cInventario,
    rInventario,
    uInventario,
    dInventario,
    qInventario
}