/**
 * Controlador modulo ventas 
 */
 const {response}=require('express');
 const {pool}=require('../database/database');
 const {StatusCodes}= require('http-status-codes')
 const {getResponseError,getResponseConflict,getResponseOk}= require('../response/responseStatusCode');
 const {cSalesOrder,rSalesOrder,uSalesOrder,dSalesOrder}=require('../models/pedidos');
 const { cSalesDetail,rSalesDetail,uSalesDetail,dSalesDetail}=require('../models/detallePedido');
 const {getSalesOrdForCreate,getSalesOrdForUpdate,getSalesOrdFromQuery,
        getSalesDetailForCreate,getSalesDetailForUpdate,getSalesDetailFromQuery}=require('../mapers/salesMaper');
const {cDevoluciones,rDevoluciones,uDevoluciones,dDevoluciones,qDevoluciones}=require('../models/devoluciones');
const {getDevolucionesFromQuery,getDevolucionesFromRequest}=require('../mapers/salesMaper');

//#region Pedidos

 /**
  * Crea un pedido en la DB
  * @param {request} req 
  * @param {response} res 
  * @returns json
  */
 const createPedido=async(req,res=response)=>{
     try {
         let rta;
         const salesOrderCreate=getSalesOrdForCreate(req);
        await pool.query(cSalesOrder,[salesOrderCreate.cliente,salesOrderCreate.direccionEntrega,salesOrderCreate.ciudad,salesOrderCreate.observaciones]);
        rta=getResponseOk("Pedido creado correctamente",{salesOrderCreate});
        return res.status(StatusCodes.OK).json({"response":rta});
     } catch (error) {
         rta=getResponseError("Error al crear pedido");
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({
             "response":rta
         });
     }
 }

 /**
  * Consulta un pedido en la DB
  * @param {request} req 
  * @param {response} res 
  * @returns json
  */
 const readPedido=async(req,res=response)=>{
     try {
         let rta;
         const{idpedidos}=req.body;
         const salesOrderExisted=await pool.query(rSalesOrder,[idpedidos]);
         if(salesOrderExisted.length===0){
            rta=getResponseConflict("El pedido no existe",{idpedidos});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
         }
         const salesOrderQuery=getSalesOrdFromQuery(salesOrderExisted);
         rta=getResponseOk("Pedido encontrado",{salesOrderQuery});
         return res.status(StatusCodes.OK).json({"response":rta});

     } catch (error) {
         rta=getResponseError("Error al consultar el pedido");
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({
             "response":rta
         });
     }
 } 

/**
 * Actualiza un pedido en la BD
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
 const updatePedido=async(req,res=response)=>{
     try {
         let rta;
         const salesOrderUpdate=getSalesOrdForUpdate(req);
         const {idpedidos}=req.body;
         const salesOrderExisted= await pool.query(rSalesOrder,[idpedidos]);
         if (salesOrderExisted.length===0) {
             rta=getResponseConflict("El pedido no existe",{idpedidos});
             return res.status(StatusCodes.CONFLICT).json({"response":rta});
         }
         await pool.query(uSalesOrder,[salesOrderUpdate.cliente,salesOrderUpdate.direccionEntrega,salesOrderUpdate.ciudad,salesOrderUpdate.observaciones,salesOrderUpdate.idpedidos]);
         rta=getResponseOk("Pedido actualizado correctamente",{salesOrderUpdate});
         return res.status(StatusCodes.OK).json({"response":rta});
     } catch (error) {
         rta=getResponseError("Error al actualizar el pedido");
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({
             "response":rta
         });
     }
 }

 /**
  * Elimina un pedido de de la DB
  * @param {request} req 
  * @param {response} res 
  * @returns json
  */
 const deletePedido=async(req,res=response)=>{
     try {
         let rta;
         const {idpedidos}=req.body;
         const salesOrderExisted= await pool.query(rSalesOrder,[idpedidos]);
         if (salesOrderExisted.length===0) {
             rta=getResponseConflict("El pedido no existe",{idpedidos});
             return res.status(StatusCodes.CONFLICT).json({"response":rta});
         }
         await pool.query(dSalesOrder,[idpedidos]);
         rta=getResponseOk("Pedido eliminado correctamente",{});
         return res.status(StatusCodes.OK).json({"response":rta});
     } catch (error) {
         rta=getResponseError("Error al eliminar pedido");
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({
             "response":rta
         });
     }
 }


 //#endregion

 //#region Detalle pedido
 /**
  * Crea un detalle de pedido en la DB  
  * @param {request} req 
  * @param {response} res 
  * @returns json
  */
const createDetailPedido=async(req,res=response)=>{
    try {
        let rta;
        const detailOrder=getSalesDetailForCreate(req);
        const salesOrderExisted=await pool.query(rSalesOrder,[detailOrder.pedido]);
        if (salesOrderExisted.length===0) {
            let pedido=detailOrder.pedido
            rta=getResponseConflict("El pedido no existe",{pedido});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(cSalesDetail,[detailOrder.producto,detailOrder.cantidad,detailOrder.precio,detailOrder.impuesto
        ,detailOrder.cliente,detailOrder.ciudad,detailOrder.pedido,detailOrder.tipoProducto,detailOrder.anio,detailOrder.mes,detailOrder.dia]);
        rta=getResponseOk("Detalle creado correctamente",{detailOrder});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error creación detalle pedido");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * COnsulta un detalle de pedido en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const readDetailPedido=async(req,res=response)=>{
    try {
        let rta;
        const{iddetallePedido}=req.body;
        const salesDetailExisted=await pool.query(rSalesDetail,[iddetallePedido]);
        if(salesDetailExisted.length===0){
            rta=getResponseConflict("El detalle no existe",{iddetallePedido});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        const salesDetailQuery=getSalesDetailFromQuery(salesDetailExisted);
        rta=getResponseOk("Detalle encontrado",{salesDetailQuery});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error consulta detalle pedido");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Actualiza un detalle de pedido en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const updateDetailPedido=async(req,res=response)=>{
    try {
        let rta;
        const salesDetailUpdate=getSalesDetailForUpdate(req);
        const {iddetallePedido}=req.body;
        const salesDetailExisted=await pool.query(rSalesDetail,[iddetallePedido]);
        if(salesDetailExisted.length===0){
            rta=getResponseConflict("El detalle no existe",{iddetallePedido});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(uSalesDetail,[salesDetailUpdate.producto,salesDetailUpdate.cantidad,salesDetailUpdate.precio,salesDetailUpdate.impuesto,
            salesDetailUpdate.cliente,salesDetailUpdate.ciudad,salesDetailUpdate.pedido,salesDetailUpdate.tipoProducto,salesDetailUpdate.anio,salesDetailUpdate.mes,salesDetailUpdate.dia,salesDetailUpdate.iddetallePedido]);
        rta=getResponseOk("Detalle actualizado correctamente",{salesDetailUpdate});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error actualización detalle pedido");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

/**
 * Elimina un detalle de pedido en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const deleteDetailPedido=async(req,res=response)=>{
    try {
        let rta;
        const {iddetallePedido}=req.body;
        const salesDetailExisted=await pool.query(rSalesDetail,[iddetallePedido]);
        if(salesDetailExisted.length===0){
            rta=getResponseConflict("El detalle no existe",{iddetallePedido});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(dSalesDetail,[iddetallePedido]);
        rta=getResponseOk("Detalle eliminado correctamente",{iddetallePedido});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error eliminación detalle pedido");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}
 
//#endregion

//#region  Devoluciones

/**
 * Crea una devolución en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const createDevolution=async(req,res=response)=>{
    try {
        let rta;
        const newDevolucion=getDevolucionesFromRequest(req);
        const {producto,precio}=req.body;
        let cmd=`${qDevoluciones} WHERE producto=${producto} AND precio=${precio};`;
        const devolucionExisted=await pool.query(cmd);
        if (devolucionExisted.length>0) {
            rta=getResponseConflict("Ya existe una devolucion del mismo producto en el mismo pedido",{producto,precio});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(cDevoluciones,[newDevolucion.pedido,newDevolucion.producto,newDevolucion.cantidad,
            newDevolucion.precio,newDevolucion.impuesto,newDevolucion.observaciones]);
            rta=getResponseOk("Devolucion creada correctamente",{newDevolucion});
            return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al crear devolución");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}


/**
 * Consulta una devolución en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const readDevolution=async(req,res=response)=>{
    try {
        let rta;
        const {iddevoluciones}=req.body;
        const devolucionExisted=await pool.query(rDevoluciones,[iddevoluciones]);
        if (devolucionExisted.length===0) {
            rta=getResponseConflict("La devolucion no existe",{});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        const DevolucionFind = getDevolucionesFromQuery(devolucionExisted);
        rta=getResponseOk("Devolucion encontrada",{DevolucionFind});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al consultar devolución");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}


/**
 * Actualiza una devolución en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const updateDevolution=async(req,res=response)=>{
    try {
        let rta;
        const DevolucionUpdate=getDevolucionesFromRequest(req);
        const {iddevoluciones}=req.body;
        const devolucionExisted=await pool.query(rDevoluciones,[iddevoluciones]);
        if (devolucionExisted.length===0) {
            rta=getResponseConflict("La devolucion no existe",{});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(uDevoluciones,[DevolucionUpdate.pedido,DevolucionUpdate.producto,DevolucionUpdate.cantidad,
            DevolucionUpdate.precio,DevolucionUpdate.impuesto,DevolucionUpdate.observaciones,DevolucionUpdate.iddevoluciones]);
        rta=getResponseOk("Devolucion actualizada correctamente",{DevolucionUpdate});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al actualizar devolución");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}


/**
 * Elimina una devolución en la DB
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const deleteDevolution=async(req,res=response)=>{
    try {
        let rta;
        const {iddevoluciones}=req.body;
        const devolucionExisted=await pool.query(rDevoluciones,[iddevoluciones]);
        if (devolucionExisted.length===0) {
            rta=getResponseConflict("La devolucion no existe",{});
            return res.status(StatusCodes.CONFLICT).json({"response":rta});
        }
        await pool.query(dDevoluciones,[iddevoluciones]);
        rta=getResponseOk("Devolucion eliminada correctamente",{iddevoluciones});
        return res.status(StatusCodes.OK).json({"response":rta});
    } catch (error) {
        rta=getResponseError("Error al eliminar devolución");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            "response":rta
        });
    }
}

//#endregion


 module.exports={
     createPedido,
     readPedido,
     updatePedido,
     deletePedido,
     createDetailPedido,
     readDetailPedido,
     updateDetailPedido,
     deleteDetailPedido,
     createDevolution,
     readDevolution,
     updateDevolution,
     deleteDevolution
 }