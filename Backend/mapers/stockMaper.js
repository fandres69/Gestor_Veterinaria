/**Mapea las peticiones  de creación y actualización de stock (Inventario)*/

const {stockInv}=require('../models/inventario');

/**
 * Retorna el modelo de stock para creación
 * @param {request} req 
 * @returns Stock object
 */
const getStockForCreate=(req)=>{
    const nStock={...stockInv};
    const{producto,stock,stockMin,stockMax,PrecioVenta,impuesto,descuento}=req.body;
    nStock.producto=producto;
    nStock.stock=stock;
    nStock.stockMin=stockMin;
    nStock.stockMax=stockMax;
    nStock.PrecioVenta=PrecioVenta;
    nStock.impuesto=impuesto;
    nStock.descuento=descuento;
    return nStock;
}

/**
 * Retorna el modelo de stock para update
 * @param {request} req 
 * @returns Stock object
 */
 const getStockForUpdate=(req)=>{
    const nStock={...stockInv};
    const{producto,stock,stockMin,stockMax,PrecioVenta,impuesto,descuento,idInventario}=req.body;
    nStock.producto=producto;
    nStock.stock=stock;
    nStock.stockMin=stockMin;
    nStock.stockMax=stockMax;
    nStock.PrecioVenta=PrecioVenta;
    nStock.impuesto=impuesto;
    nStock.descuento=descuento;
    nStock.idInventario=idInventario;
    return nStock;
}

/**
 * Retorna el modelo de stock desde un query
 * @param {request} req 
 * @returns Stock object
 */
 const getStockFromQuery=(result)=>{
    const nStock={...stockInv};
   
    nStock.producto=result[0].producto;
    nStock.stock=result[0].stock;
    nStock.stockMin=result[0].stockMin;
    nStock.stockMax=result[0].stockMax;
    nStock.PrecioVenta=result[0].PrecioVenta;
    nStock.impuesto=result[0].impuesto;
    nStock.descuento=result[0].descuento;
    nStock.idInventario=result[0].idInventario;
    return nStock;
}


module.exports={
    getStockForCreate,
    getStockForUpdate,
    getStockFromQuery
}
