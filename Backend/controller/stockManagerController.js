/**
 * Controlador modulo stockManager
 */

const {response}=require('express');
const {pool}=require('../database/database');
const {StatusCodes}= require('http-status-codes');
const {getResponseError,getResponseConflict,getResponseOk}= require('../response/responseStatusCode');
const {getProductForCreate,getProductForUpdate}=require('../mapers/productMaper');
const {qProduct,cProducto,rProducto,uProducto,dProducto}=require('../models/productos');
const {getStockForCreate,getStockForUpdate,getStockFromQuery}=require('../mapers/stockMaper');
const {cInventario,rInventario,uInventario,dInventario,qInventario}=require('../models/inventario');
const {getServiceForCreate,getServiceForUpdate,getServiceFromQuery}=require('../mapers/serviciosMaper');
const { qService, cService, rService, uService, dService } = require('../models/servicios');


/**
 * Crea un producto en el sistema
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const createProduct=async(req,res=response)=>{
    try {
        let rta;
        const myProduct=getProductForCreate(req);
        let cmd=`${qProduct} WHERE producto='${myProduct.producto}';`;
        const vProduct=await pool.query(cmd,[]);
        if (vProduct.length>0) {
            rta=getResponseConflict("Ya existe unproducto con esta descripcion",{vProduct});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(cProducto,[myProduct.producto,myProduct.ciudad,myProduct.presentacion,myProduct.unEmpaque,myProduct.descripcion])
        rta=getResponseOk("Producto creado correctamente",{myProduct});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al crear producto");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Consulta producto en la BD
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const readProduct=async(req,res=response)=>{
    try {
        let rta;
        const {idProductos}=req.body;
        const productQ=await pool.query(rProducto,[idProductos]);
        if(productQ.length===0){
            rta=getResponseConflict("El producto consultado no existe",{idProductos});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        rta=getResponseOk("Consulta exitosa",{productQ});
        return res.status(StatusCodes.OK).json({"response":rta});
        
    } catch (error) {
        rta=getResponseError("Error");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Actualiza un producto en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const updateProduct=async(req,res=response)=>{
    try {
        let rta;
        const myProduct=getProductForUpdate(req);
        const {idProductos}=req.body;
        const productQ=await pool.query(rProducto,[idProductos]);
        if(productQ.length===0){
            rta=getResponseConflict("El producto consultado no existe",{idProductos});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
       
        await pool.query(uProducto,[myProduct.producto,myProduct.ciudad,myProduct.presentacion,myProduct.unEmpaque,myProduct.descripcion,myProduct.idProductos]);
        rta=getResponseOk("Producto actualizado correctamente",{myProduct});
        return res.status(StatusCodes.OK).json({"response":rta});   
    } catch (error) {
        console.log(error);
        rta=getResponseError("Error al actualizar el producto");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Elimina un producto en la DB 
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const deleteProduct=async(req,res=response)=>{
    try {
        let rta;
        const {idProductos}=req.body;
        const productQ=await pool.query(rProducto,[idProductos]);
        if(productQ.length===0){
            rta=getResponseConflict("El producto consultado no existe",{idProductos});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(dProducto,[idProductos]);
        rta=getResponseOk("El producto fue eliminado",{idProductos});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}


/**
 * Crea un stock en la base de datos (inventario)
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const createStock=async(req,res=response)=>{
    try {
        let rta;
        const mStock=getStockForCreate(req);
        let cmd=`${qInventario} WHERE producto=${mStock.producto};`;
        const StockExistente=await pool.query(cmd,[]);
        if(StockExistente.length>0){
            rta=getResponseConflict("Ya hay un producto registrado en el control de inventario",{StockExistente});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(cInventario,[mStock.producto,mStock.stock,mStock.stockMin,mStock.stockMax,mStock.PrecioVenta,mStock.impuesto,mStock.descuento]);
        rta=getResponseOk("Inventario de producto creado correctamente",{mStock});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al crear el stock");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Consulta el inventario de un producto de la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const readStock=async(req,res=response)=>{

    try {
        let rta;
        const {idInventario}=req.body;        
        const StockExistente=await pool.query(rInventario,[idInventario]);
        if(StockExistente.length===0){
            rta=getResponseConflict("El inventario no existe",{idInventario});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        rta=getResponseOk("Inventario encontrado ",{StockExistente});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al consulta el inventario");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }

}

/**
 * Actualiza un inventario
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const updateStock=async(req,res=response)=>{
    try {
        let rta;
        const {idInventario}=req.body;
        const StockUPdated=getStockForUpdate(req);
        const StockExistente=await pool.query(rInventario,[StockUPdated.idInventario]);
        if(StockExistente.length===0){
            rta=getResponseConflict("El inventario no existe",{idInventario});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(uInventario,[StockUPdated.producto,StockUPdated.stock,StockUPdated.stockMin,StockUPdated.stockMax,StockUPdated.PrecioVenta
        ,StockUPdated.impuesto,StockUPdated.descuento,StockUPdated.idInventario]);
        rta=getResponseOk("Inventario actualizado correctamente",{StockUPdated});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al actualizar inventario");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }

}

/**
 * Elimina un inventario de la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const deleteStock=async(req,res=response)=>{
    try {
        let rta;
        const {idInventario}=req.body;
        const StockExistente=await pool.query(rInventario,[idInventario]);
        if(StockExistente.length===0){
            rta=getResponseConflict("El inventario no existe",{idInventario});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(dInventario,[idInventario]);
        rta=getResponseOk("El inventario fue eliminado",{idInventario});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al eliminar inventario");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Crea un servicio en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const createServiceV=async(req,res=response)=>{
    try {
        let rta;
        const newService=getServiceForCreate(req);
        let cmd=`${qService} WHERE servicio = '${newService.servicio}';`;
        const serviceExited=await pool.query(cmd);
        if(serviceExited.length>0){
            rta=getResponseConflict("El servicio a crear ya existe",{serviceExited});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});     
        }
        await pool.query(cService,[newService.servicio,newService.descripcion,newService.precio,newService.impuesto,newService.descuento]);
        rta=getResponseOk("Servicio creado correctamente",{newService});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al crear servicio");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Consulta un servicio en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const readServiceV=async(req,res=response)=>{
    try {
        let rta;
        const {idServicios}=req.body;
        const serviceExisted=await pool.query(rService,[idServicios]);
        if(serviceExisted.length===0){
            rta=getResponseConflict("El servicio no existe",{});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        const serviceQuery=getServiceFromQuery(serviceExisted);
        rta=getResponseOk("Servicio encontrado",{serviceQuery});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al consultar servicio");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
   
}

/**
 * Actualiza un servicio en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const updateServiceV=async(req,res=response)=>{
    try {
        let rta;
        const serviceUpdate=getServiceForUpdate(req);
        const {idServicios}=req.body;
        const serviceExisted=await pool.query(rService,[idServicios]);
        if(serviceExisted.length===0){
            rta=getResponseConflict("El servicio no existe",{});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(uService,[serviceUpdate.servicio,serviceUpdate.descripcion,serviceUpdate.precio,serviceUpdate.impuesto,serviceUpdate.descuento,serviceUpdate.idServicios]);
        rta=getResponseOk("Servicio actualizado correctamente",{serviceUpdate});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al actualizar el servicio");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Elimina un servicio de la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const deleteServiceV=async(req,res=response)=>{
    try {
        let rta;
        const {idServicios}=req.body;
        const serviceExisted=await pool.query(rService,[idServicios]);
        if(serviceExisted.length===0){
            rta=getResponseConflict("El servicio no existe",{});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(dService,[idServicios]);
        rta=getResponseOk("Servicio eliminado correctamente",{idServicios});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al eliminar el servicio");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }

}

module.exports={
    createProduct,
    readProduct,
    updateProduct,
    deleteProduct,
    createStock,
    readStock,
    updateStock,
    deleteStock,
    createServiceV,
    readServiceV,
    updateServiceV,
    deleteServiceV
}