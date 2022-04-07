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
const {cInventario,rInventario,uInventario,dInventario,qInventario, updStockInventario}=require('../models/inventario');
const {getServiceForCreate,getServiceForUpdate,getServiceFromQuery}=require('../mapers/serviciosMaper');
const { qService, cService, rService, uService, dService } = require('../models/servicios');
const {cIngresosInventario,rIngresosInventario,uIngresosInventario,dIngresosInventario, qIngresosInventario}=require('../models/ingresosinventario');
const {getStockInFromQuery,getStockInFromRequest}=require('../mapers/stockInMaper');

//#region Producto
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
            rta=getResponseConflict("Ya existe un producto con esta descripcion",{vProduct});
            return  res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'Ya existe un producto con esta descripcion',
             errors:[
                 {
                    msg:'Ya existe un producto con esta descripcion',
                    params:`producto: ${myProduct.producto}`
                 }
             ]          
            });
        }
        await pool.query(cProducto,[myProduct.producto,myProduct.ciudad,myProduct.presentacion,myProduct.unEmpaque,myProduct.descripcion])
        rta=getResponseOk("Producto creado correctamente",{myProduct});
        return  res.status(StatusCodes.OK).
        json({
         OK:true,
         statusCode:StatusCodes.OK,
         statusDescription:'Producto creado correctamente',
         productos:[myProduct]       
        });
    } catch (error) {
        rta=getResponseError("Error al crear producto");
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al crear producto',
         errors:[
             {
                msg:'Error al crear producto',
                params:''
             }
         ]          
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
            return  res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El producto consultado no existe',
             errors:[
                 {
                    msg:'El producto consultado no existe',
                    params:`idProductos:${idProductos}`
                 }
             ]          
            });
        }
        rta=getResponseOk("Consulta exitosa",{productQ});
        return  res.status(StatusCodes.OK).
        json({
         OK:true,
         statusCode:StatusCodes.OK,
         statusDescription:'Producto encontrado',
         productos:[productQ]       
        });
        
    } catch (error) {      
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al consultar producto',
         errors:[
             {
                msg:'Error al consultar producto',
                params:''
             }
         ]          
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
            return  res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El producto consultado no existe',
             errors:[
                 {
                    msg:'El producto consultado no existe',
                    params:`idProductos:${idProductos}`
                 }
             ]          
            });
        }
       
        await pool.query(uProducto,[myProduct.producto,myProduct.ciudad,myProduct.presentacion,myProduct.unEmpaque,myProduct.descripcion,myProduct.idProductos]);
        rta=getResponseOk("Producto actualizado correctamente",{myProduct});
        return  res.status(StatusCodes.OK).
        json({
         OK:true,
         statusCode:StatusCodes.OK,
         statusDescription:'Producto actualizado correctamente',
         productos:[myProduct]       
        });
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al actualizar producto',
         errors:[
             {
                msg:'Error al actualizar producto',
                params:''
             }
         ]          
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
            return  res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El producto consultado no existe',
             errors:[
                 {
                    msg:'El producto consultado no existe',
                    params:`idProductos:${idProductos}`
                 }
             ]          
            });
        }
        await pool.query(dProducto,[idProductos]);
        return  res.status(StatusCodes.OK).
        json({
         OK:true,
         statusCode:StatusCodes.OK,
         statusDescription:'Producto eliminado correctamente',
         productos:[productQ]       
        });
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al eliminar producto',
         errors:[
             {
                msg:'Error al eliminar producto',
                params:''
             }
         ]          
        });
    }
}

/**
 * Retorna un listado de productos consultado con un criterio
 * @param {require} req 
 * @param {response} res 
 * @returns json
 */
const getProducts=async(req,res=response)=>{
    try {
        const criterio=req.params.criterio;
        if (criterio && criterio==='') {
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'No hay criterio de búsqueda',
             errors:[
                 {
                     msg:'No hay criterio de búsqueda',
                     params:''
                 }
             ]          
            });
        }

        let cmd=`${qProduct} WHERE producto LIKE'%${criterio}%';`;
        const products=await pool.query(cmd);
        if(products.length===0){
           return res.status(StatusCodes.CONFLICT).
           json({
            OK:false,
            statusCode:StatusCodes.CONFLICT,
            statusDescription:'No hay resultados encontrados',
            errors:[
                {
                    msg:'No hay resultados encontrados',
                    params:''
                }
            ]          
           });
        }
        return res.status(StatusCodes.OK).
           json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Resultados encontrados',
            productos:[products]                 
           });

    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al consultar los productos',
         errors:[
             {
                msg:'Error al consultar los productos',
                params:''
             }
         ]          
        });
    } 
}

const getAllProducts=async(req,res=response)=>{
    try {
        const products=await pool.query(qProduct);
        if(products.length===0){
            return res.status(StatusCodes.CONFLICT).
           json({
            OK:false,
            statusCode:StatusCodes.CONFLICT,
            statusDescription:'No hay resultados encontrados',
            errors:[
                {
                    msg:'No hay resultados encontrados',
                    params:''
                }
            ]          
           });
        }
        return res.status(StatusCodes.OK).
        json({
         OK:true,
         statusCode:StatusCodes.OK,
         statusDescription:'Resultados encontrados',
         productos:[products]                 
        });

    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al consultar los productos',
         errors:[
             {
                msg:'Error al consultar los productos',
                params:''
             }
         ]          
        });
    }
}
//#endregion

//#region Inventario
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
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'Ya hay un producto registrado en el control de inventario',
             errors:[
                 {
                     msg:'Ya hay un producto registrado en el control de inventario',
                     params:`producto: ${mStock.producto}`
                 }
             ]          
            });
        }
        await pool.query(cInventario,[mStock.producto,mStock.stock,mStock.stockMin,mStock.stockMax,mStock.PrecioVenta,mStock.impuesto,mStock.descuento]);
        rta=getResponseOk("Inventario de producto creado correctamente",{mStock});
        return res.status(StatusCodes.OK).
        json({
         OK:true,
         statusCode:StatusCodes.OK,
         statusDescription:'Inventario creado',
         stocks:[mStock]    
        });
       
    } catch (error) {
        rta=getResponseError("Error al crear el stock");
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al crear inventario',
         errors:[
             {
                msg:'Error al crear inventario',
                params:''
             }
         ]          
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
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El inventario no existe',
             errors:[
                 {
                     msg:'El inventario no existe',
                     params:''
                 }
             ]          
            });
        }
        rta=getResponseOk("Inventario encontrado ",{StockExistente});
        return res.status(StatusCodes.OK).
            json({
             OK:true,
             statusCode:StatusCodes.OK,
             statusDescription:'Inventario encontrado',
             stocks:[StockExistente]    
            });
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al consultar inventario',
         errors:[
             {
                msg:'Error al consultar inventario',
                params:''
             }
         ]          
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
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El inventario no existe',
             errors:[
                 {
                     msg:'El inventario no existe',
                     params:''
                 }
             ]          
            });
        }
        await pool.query(uInventario,[StockUPdated.producto,StockUPdated.stock,StockUPdated.stockMin,StockUPdated.stockMax,StockUPdated.PrecioVenta
        ,StockUPdated.impuesto,StockUPdated.descuento,StockUPdated.idInventario]);
        rta=getResponseOk("Inventario actualizado correctamente",{StockUPdated});
        return res.status(StatusCodes.OK).
            json({
             OK:true,
             statusCode:StatusCodes.OK,
             statusDescription:'El inventario fue actualizado',
             stocks:[StockUPdated]    
            });
    } catch (error) {        
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al actualizar inventario',
         errors:[
             {
                msg:'Error al actualizar inventario',
                params:''
             }
         ]          
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
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El inventario no existe',
             errors:[
                 {
                     msg:'El inventario no existe',
                     params:''
                 }
             ]          
            });
        }
        await pool.query(dInventario,[idInventario]);
        rta=getResponseOk("El inventario fue eliminado",{idInventario});
        return res.status(StatusCodes.OK).
            json({
             OK:true,
             statusCode:StatusCodes.OK,
             statusDescription:'El inventario fue eliminado',
             stocks:[StockExistente]    
            });
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al eliminar inventario',
         errors:[
             {
                msg:'Error al eliminar inventario',
                params:''
             }
         ]          
        });
    }
}

/**
 * Retorna un listado de inventarios buscados por producto bajo un criterio
 * @param {require} req 
 * @param {response} res 
 * @returns json
 */
const getStocks=async(req,res=response)=>{
    try {
        const criterio=req.params.criterio;
        if (criterio && criterio==='') {
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'No hay criterio de búsqueda',
             errors:[
                 {
                     msg:'No hay criterio de búsqueda',
                     params:''
                 }
             ]          
            });
        }
        const cmd=`${qInventario} WHERE producto LIKE '%${criterio}%'`;

        const inventarios=await pool.query(cmd);
        if(inventarios.length===0){
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'No hay inventarios encontrados',
             errors:[
                 {
                     msg:'No hay inventarios encontrados',
                     params:''
                 }
             ]          
            });
        }
        return res.status(StatusCodes.OK).
            json({
             OK:true,
             statusCode:StatusCodes.OK,
             statusDescription:'Inventarios encontrados',
             stocks:[inventarios]      
            });

    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al consultar los inventarios',
         errors:[
             {
                msg:'Error al consultar los inventarios',
                params:''
             }
         ]          
        });
    }
}

/**
 * Retorna un stock de un producto
 * @param {require} req 
 * @param {response} res 
 * @returns json
 */
const getStockId=async(req,res=response)=>{
    try {
        const producto=req.params.producto;
        if (producto && producto==='') {
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'No hay producto a buscar',
             errors:[
                 {
                     msg:'No hay producto a buscar',
                     params:''
                 }
             ]          
            });
        }
        let cmd=`${qInventario} WHERE producto =?;`
        const sStock=await pool.query(cmd,[producto]);
        if(sStock.length===0){
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'No hay inventario encontrado',
             errors:[
                 {
                     msg:'No hay inventario encontrado',
                     params:''
                 }
             ]          
            });
        }
        return res.status(StatusCodes.OK).
            json({
             OK:true,
             statusCode:StatusCodes.OK,
             statusDescription:'Inventario encontrado',
             stocks:[sStock]      
            });

    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al consultar el inventarios',
         errors:[
             {
                msg:'Error al consultar el inventarios',
                params:''
             }
         ]          
        });
    }
}

const getCompleteStock=async(req,res=response)=>{
    try {
        const inventariosQ=await pool.query(qInventario);
        if(inventariosQ.length===0){
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'No hay inventarios encontrados',
             errors:[
                 {
                     msg:'No hay inventarios encontrados',
                     params:''
                 }
             ]          
            });
        }
        return res.status(StatusCodes.OK).
        json({
         OK:true,
         statusCode:StatusCodes.OK,
         statusDescription:'Inventario encontrado',
         stocks:[inventariosQ]      
        });
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al consultar el inventarios',
         errors:[
             {
                msg:'Error al consultar el inventarios',
                params:''
             }
         ]          
        });
    }
}
//#endregion 

//#region Servicios

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
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El servicio a crear ya existe',
             errors:[
                 {
                     msg:'El servicio a crear ya existe',
                     params:''
                 }
             ]          
            });   
        }
        await pool.query(cService,[newService.servicio,newService.descripcion,newService.precio,newService.impuesto,newService.descuento]);
        rta=getResponseOk("Servicio creado correctamente",{newService});
        return res.status(StatusCodes.OK).
           json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Servicio creado correctamente',
            servicios:[newService]                 
           });

    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al crear el servicio',
         errors:[
             {
                msg:'Error al crear el servicio',
                params:''
             }
         ]          
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
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El servicio no existe',
             errors:[
                 {
                     msg:'El servicio no existe',
                     params:''
                 }
             ]          
            });   
        }
        const serviceQuery=getServiceFromQuery(serviceExisted);
        rta=getResponseOk("Servicio encontrado",{serviceQuery});
        return res.status(StatusCodes.OK).
           json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Servicio encontrado',
            servicios:[serviceExisted]                 
           });
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al consultar el servicio',
         errors:[
             {
                msg:'Error al consultar el servicio',
                params:''
             }
         ]          
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
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El servicio no existe',
             errors:[
                 {
                     msg:'El servicio no existe',
                     params:''
                 }
             ]          
            });   
        }
        await pool.query(uService,[serviceUpdate.servicio,serviceUpdate.descripcion,serviceUpdate.precio,serviceUpdate.impuesto,serviceUpdate.descuento,serviceUpdate.idServicios]);
        rta=getResponseOk("Servicio actualizado correctamente",{serviceUpdate});
        return res.status(StatusCodes.OK).
           json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Servicio actualizado correctamente' ,
            servicios:[serviceUpdate]                 
           });
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al actualizar el servicio',
         errors:[
             {
                msg:'Error al actualizar el servicio',
                params:''
             }
         ]          
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
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El servicio no existe',
             errors:[
                 {
                     msg:'El servicio no existe',
                     params:''
                 }
             ]          
            });   
        }
        await pool.query(dService,[idServicios]);
        rta=getResponseOk("Servicio eliminado correctamente",{idServicios});
        return res.status(StatusCodes.OK).
           json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Servicio eliminado correctamente',
            servicios:[serviceExisted]                 
           });
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al eliminar el servicio',
         errors:[
             {
                msg:'Error al eliminar el servicio',
                params:''
             }
         ]          
        });
    }

}

/**
 * Retorna un listado de servicios buscados con un criterio
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const getServicios=async(req,res=response)=>{
    try {
        const criterio=req.params.criterio;
        if (criterio && criterio==='') {
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'No hay criterio de búsqueda',
             errors:[
                 {
                     msg:'No hay criterio de búsqueda',
                     params:''
                 }
             ]          
            });
        }
        const cmd=`${qService} WHERE servicio LIKE '%${criterio}%';`;
        const servicios=await pool.query(cmd);
        if (servicios.length===0) {
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'No hay servicios encontrados',
             errors:[
                 {
                     msg:'No hay servicios encontrados',
                     params:''
                 }
             ]          
            });   
        }
        return res.status(StatusCodes.OK).
        json({
         OK:true,
         statusCode:StatusCodes.OK,
         statusDescription:'Servicios encontrados',
         servicios:[servicios]                 
        });

    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al consultar servicios',
         errors:[
             {
                msg:'Error al consultar servicios',
                params:''
             }
         ]          
        });
    }
}

//#endregion

//#region Ingresos inventario

/**
 * Crea una entrada de inventario en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const createStockIn=async(req,res=response)=>{
    try {
        let rta;
        const newStockIn=getStockInFromRequest(req);
        const productoQ=await pool.query(rProducto,[newStockIn.producto]);
        if (productoQ.length===0) {
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El producto no existe',
             errors:[
                 {
                     msg:'El producto no existe',
                     params:''
                 }
             ]          
            }); 
        }
        let cmd =`${qInventario} WHERE producto=${newStockIn.producto};`;
        const inventarioQ=await pool.query(cmd);
        if (inventarioQ.length===0) {
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El producto no tiene registro de inventario',
             errors:[
                 {
                     msg:'El producto no tiene registro de inventario',
                     params:''
                 }
             ]          
            }); 
        }    
        const nStock=parseInt(inventarioQ[0].stock) + newStockIn.cantidad;        
        await pool.query(cIngresosInventario,[newStockIn.producto,newStockIn.cantidad,newStockIn.Precio,
            newStockIn.dia,newStockIn.mes,newStockIn.anio]);
        await pool.query(updStockInventario,[nStock,inventarioQ[0].idInventario]);
       
        return res.status(StatusCodes.OK).
        json({
         OK:true,
         statusCode:StatusCodes.OK,
         statusDescription:'Entrada de inventario creada correctamente',
         entradas:[cIngresosInventario]                 
        });
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al crear entrada de inventario',
         errors:[
             {
                msg:'Error al crear entrada de inventario',
                params:''
             }
         ]          
        });
    }
}

/**
 * Consulta una entrada de inventario en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const readStockIn=async(req,res=response)=>{
    try {
        let rta;
        const{idingresosInventario} = req.body;
        const StockInExited=await pool.query(rIngresosInventario,[idingresosInventario]);
        if (StockInExited.length===0) {
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El ingreso de inventario no existe',
             errors:[
                 {
                     msg:'El ingreso de inventario no existe',
                     params:''
                 }
             ]          
            }); 
        }
        const StockInFind=getStockInFromQuery(StockInExited);
        return res.status(StatusCodes.OK).
        json({
         OK:true,
         statusCode:StatusCodes.OK,
         statusDescription:'Entrada de inventario encontrada correctamente',
         entradas:[StockInExited]                 
        });
    } catch (error) {
        rta=getResponseError("Error al consultar entrada de inventario");
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al consultar entrada de inventario',
         errors:[
             {
                msg:'Error al consultar entrada de inventario',
                params:''
             }
         ]          
        });
    }
}

/**
 * Actualiza una entrada de inventario en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const updateStockIn=async(req,res=response)=>{
    try {
        let rta;
        const stockInUpdate=getStockInFromRequest(req);
        const{idingresosInventario} = req.body;
        const StockInExited=await pool.query(rIngresosInventario,[idingresosInventario]);
        if (StockInExited.length===0) {
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El ingreso de inventario no existe',
             errors:[
                 {
                     msg:'El ingreso de inventario no existe',
                     params:''
                 }
             ]          
            }); 
        }
        const productoQ=await pool.query(rProducto,[StockInExited[0].producto]);
        if (productoQ.length===0) {
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El producto no existe',
             errors:[
                 {
                     msg:'El producto no existe',
                     params:''
                 }
             ]          
            }); 
        }
        let cmd =`${qInventario} WHERE producto=${StockInExited[0].producto};`;
        const inventarioQ=await pool.query(cmd);
        if (inventarioQ.length===0) {
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El producto no tiene registro de inventario',
             errors:[
                 {
                     msg:'El producto no tiene registro de inventario',
                     params:''
                 }
             ]          
            }); 
        } 
        const nStock=parseInt(inventarioQ[0].stock) + stockInUpdate.cantidad - parseInt(StockInExited[0].cantidad);      
       
        await pool.query(uIngresosInventario,[stockInUpdate.producto,stockInUpdate.cantidad,stockInUpdate.Precio
        ,stockInUpdate.dia,stockInUpdate.mes,stockInUpdate.anio,stockInUpdate.idingresosInventario]);
        rta=getResponseOk("Ingreso de inventario actualizado",{stockInUpdate});

        await pool.query(updStockInventario,[nStock,inventarioQ[0].idInventario]);

        return res.status(StatusCodes.OK).
        json({
         OK:true,
         statusCode:StatusCodes.OK,
         statusDescription:'Entrada de inventario actualizada correctamente',
         entradas:[stockInUpdate]                 
        });
    } catch (error) {
        rta=getResponseError("Error al consultar entrada de inventario");
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al actualizar entrada de inventario',
         errors:[
             {
                msg:'Error al actualizar entrada de inventario',
                params:''
             }
         ]          
        });
    }
}

/**
 * Elimina una entrada de inventario en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const deleteStockIn=async(req,res=response)=>{
    try {
        let rta;
        const stockInUpdate=getStockInFromRequest(req);
        const{idingresosInventario} = req.body;
        const StockInExited=await pool.query(rIngresosInventario,[idingresosInventario]);
        if (StockInExited.length===0) {
            rta=getResponseConflict("El ingreso de inventario no existe",{idingresosInventario});
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El ingreso de inventario no existe',
             errors:[
                 {
                     msg:'El ingreso de inventario no existe',
                     params:''
                 }
             ]          
            }); 
        }

        const productoQ=await pool.query(rProducto,[StockInExited[0].producto]);
        if (productoQ.length===0) {
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El producto no existe',
             errors:[
                 {
                     msg:'El producto no existe',
                     params:''
                 }
             ]          
            }); 
        }
        let cmd =`${qInventario} WHERE producto=${StockInExited[0].producto};`;
        const inventarioQ=await pool.query(cmd);
        if (inventarioQ.length===0) {
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'El producto no tiene registro de inventario',
             errors:[
                 {
                     msg:'El producto no tiene registro de inventario',
                     params:''
                 }
             ]          
            }); 
        } 

        const nStock=parseInt(inventarioQ[0].stock) - parseInt(StockInExited[0].cantidad);
        await pool.query(updStockInventario,[nStock,inventarioQ[0].idInventario]);
        await pool.query(dIngresosInventario,[idingresosInventario]);

       return res.status(StatusCodes.OK).
        json({
         OK:true,
         statusCode:StatusCodes.OK,
         statusDescription:'Entrada de inventario eliminada correctamente',
         entradas:[StockInExited]                 
        });
    } catch (error) {
        rta=getResponseError("Error al eliminar entrada de inventario");
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al eliminar entrada de inventario',
         errors:[
             {
                msg:'Error al eliminar entrada de inventario',
                params:''
             }
         ]          
        });
    }
}

const getStocksIn=async(req,res=response)=>{
    try {
        const criterio=req.params.criterio;
        if (criterio && criterio==='') {
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'No hay criterio de búsqueda',
             errors:[
                 {
                     msg:'No hay criterio de búsqueda',
                     params:''
                 }
             ]          
            });
        }
        let cmd =`${qIngresosInventario} WHERE producto LIKE '%${criterio}%';`;
        const ingresosQ= await pool.query(cmd);
        if(ingresosQ.length===0){
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'No se encuentran registros de entradas de inventario',
             errors:[
                 {
                     msg:'No se encuentran registros de entradas de inventario',
                     params:''
                 }
             ]          
            }); 
        }
        return res.status(StatusCodes.OK).
        json({
         OK:true,
         statusCode:StatusCodes.OK,
         statusDescription:'Entrada de inventario encontradas',
         entradas:[ingresosQ]                 
        });

        
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al consultar entradas de inventario',
         errors:[
             {
                msg:'Error al consultar entradas de inventario',
                params:''
             }
         ]          
        });
    }
}

const getAllStockIn=async(req,res=response)=>{
    try {
      
        const ingresosQ= await pool.query(qIngresosInventario);
        if(ingresosQ.length===0){
            return res.status(StatusCodes.CONFLICT).
            json({
             OK:false,
             statusCode:StatusCodes.CONFLICT,
             statusDescription:'No se encuentran registros de entradas de inventario',
             errors:[
                 {
                     msg:'No se encuentran registros de entradas de inventario',
                     params:''
                 }
             ]          
            }); 
        }
        return res.status(StatusCodes.OK).
        json({
         OK:true,
         statusCode:StatusCodes.OK,
         statusDescription:'Entrada de inventario encontradas',
         entradas:[ingresosQ]                 
        });

        
    } catch (error) {
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).
        json({
         OK:false,
         statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
         statusDescription:'Error al consultar entradas de inventario',
         errors:[
             {
                msg:'Error al consultar entradas de inventario',
                params:''
             }
         ]          
        });
    } 
}
//#endregion

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
    deleteServiceV,
    createStockIn,
    readStockIn,
    updateStockIn,
    deleteStockIn,
    getProducts,
    getStocks,
    getServicios,
    getStocksIn,
    getAllProducts,
    getStockId,
    getCompleteStock,
    getAllStockIn,
}