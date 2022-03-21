/**Mapea las peticiones  de creación y actualización de servicios*/

const {serviciosV}=require('../models/servicios');

/**
 * Retorna un modelo de servicio para creación
 * @param {require} req 
 * @returns Object Servicio
 */
const getServiceForCreate=(req)=>{
  const{servicio,descripcion,precio,impuesto,descuento}=req.body;
  const cServicio={...serviciosV};
  cServicio.servicio=servicio;
  cServicio.descripcion=descripcion;
  cServicio.precio=precio;
  cServicio.impuesto=impuesto;
  cServicio.descuento=descuento;
  return cServicio;
}

/**
 * Retorna una modelo de servicio para actualización
 * @param {require} req 
 * @returns Object Servicio
 */
const getServiceForUpdate=(req)=>{
  const{servicio,descripcion,precio,impuesto,descuento,idServicios}=req.body;
  const uServicio={...serviciosV};
  uServicio.servicio=servicio;
  uServicio.descripcion=descripcion;
  uServicio.precio=precio;
  uServicio.impuesto=impuesto;
  uServicio.descuento=descuento;
  uServicio.idServicios=idServicios;
  return uServicio;
}

/**
 * Retorna un objeto servicio a partir del resultado de una consulta;
 * @param {query} result 
 * @returns Object Servicio
 */
const getServiceFromQuery=(result)=>{
    const uServicio={...serviciosV};
    uServicio.servicio=result[0].servicio;
    uServicio.descripcion=result[0].descripcion;
    uServicio.precio=result[0].precio;
    uServicio.impuesto=result[0].impuesto;
    uServicio.descuento=result[0].descuento;
    uServicio.idServicios=result[0].idServicios;
    return uServicio;
}

module.exports={getServiceForCreate,getServiceForUpdate,getServiceFromQuery}