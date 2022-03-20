/**Mapea las peticiones  de creación y actualización de producto*/

const {Tproducto}=require('../models/producto');

/**
 * Retorna el modelo de producto para creación
 * @param {request} req 
 * @returns Producto object
 */
const getProductForCreate=(req)=>{
    const nProducto={...Tproducto};
    const {producto,ciudad,presentacion,unEmpaque,descripcion} =req.body;
    nProducto.producto=producto ;
    nProducto.ciudad= ciudad;
    nProducto.presentacion= presentacion;
    nProducto.unEmpaque= unEmpaque;
    nProducto.descripcion= descripcion;
    return nProducto;
}

/**
 * Retorna una entidad de producto para actualización
 * @param {request} req 
 * @returns Producto object
 */
 const getProductForUpdate=(req)=>{
    const nProducto={...Tproducto};
    const {idProductos,producto,ciudad,presentacion,unEmpaque,descripcion} =req.body;    
    nProducto.idProductos=idProductos ;
    nProducto.producto=producto ;
    nProducto.ciudad= ciudad;
    nProducto.presentacion= presentacion;
    nProducto.unEmpaque= unEmpaque;
    nProducto.descripcion= descripcion;
    return nProducto;
}

/**
 * Retorna una entidad de producto desde el resultado de una consulta (Primer valor);
 * @param {request} result 
 * @returns Product object
 */
const getProductFromQuery=(result)=>{
    const nProducto={...Tproducto};
    nProducto.idProductos=result[0].idProductos ;
    nProducto.producto=result[0].producto ;
    nProducto.ciudad=result[0].ciudad;
    nProducto.presentacion=result[0].presentacion;
    nProducto.unEmpaque=result[0].unEmpaque;
    nProducto.descripcion=result[0].descripcion;
    return nProducto;
}


module.exports={
    getProductForCreate,
    getProductForUpdate,
    getProductFromQuery
}