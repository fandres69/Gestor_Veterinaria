/**Mapea las peticiones  de creación y actualización de ingresos de inventario*/

const {ingresosinventario}=require('../models/ingresosinventario');

/**
 * Retorna un modelo ingreso inventario a partir de un request
 * @param {request} req 
 * @returns Object
 */
const getStockInFromRequest=(req)=>{
    const nStockIn={...ingresosinventario};
    const {idingresosInventario,producto,cantidad,Precio,dia,mes,anio}=req.body;
    nStockIn.idingresosInventario=idingresosInventario;
    nStockIn.producto=producto;
    nStockIn.cantidad=cantidad;
    nStockIn.Precio=Precio;
    nStockIn.dia=dia;
    nStockIn.mes=mes;
    nStockIn.anio=anio;
    return nStockIn;
}

/**
 * Retorna un modelo ingreso inventario a partir de un request
 * @param {query} result 
 * @returns Object
 */
 const getStockInFromQuery=(result)=>{
    const nStockIn={...ingresosinventario};    
    nStockIn.idingresosInventario=result[0].idingresosInventario;
    nStockIn.producto=result[0].producto;
    nStockIn.cantidad=result[0].cantidad;
    nStockIn.Precio=result[0].Precio;
    return nStockIn;
}

module.exports={getStockInFromQuery,getStockInFromRequest}