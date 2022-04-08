/**
 * Controlador modulo ventas 
 */
 const {response}=require('express');
 const {pool}=require('../database/database');
 const {StatusCodes}= require('http-status-codes')
 const {getResponseError,getResponseConflict,getResponseOk}= require('../response/responseStatusCode');
 const {cSalesOrder,rSalesOrder,uSalesOrder,dSalesOrder, qSalesOrder}=require('../models/pedidos');
 const { cSalesDetail,rSalesDetail,uSalesDetail,dSalesDetail, qSalesDetail}=require('../models/detallePedido');
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
        await pool.query(cSalesOrder,[salesOrderCreate.cliente,salesOrderCreate.direccionEntrega,
            salesOrderCreate.ciudad,salesOrderCreate.observaciones,salesOrderCreate.dia,salesOrderCreate.mes,salesOrderCreate.anio]);
        rta=getResponseOk("Pedido creado correctamente",{salesOrderCreate});
        return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Pedido creado correctamente',
            salesOrders:[salesOrderCreate]
         });
     } catch (error) {
         rta=getResponseError("Error al crear pedido");
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al crear pedido',
            errors:[
                {
                    msg:"Error al crear pedido",
                    param:''
                }
            ]      
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
            return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'El pedido no existe',
                errors:[
                    {
                        msg:"El pedido no existe",
                        param:''
                    }
                ]});
         }
         const salesOrderQuery=getSalesOrdFromQuery(salesOrderExisted);
         rta=getResponseOk("Pedido encontrado",{salesOrderQuery});
         return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Pedido encontrado',
            salesOrders:[salesOrderExisted]
         });

     } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al consultar pedido',
            errors:[
                {
                    msg:"Error al consultar pedido",
                    param:''
                }
            ]      
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
             return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'El pedido no existe',
                errors:[
                    {
                        msg:"El pedido no existe",
                        param:''
                    }
                ]});
         }
         await pool.query(uSalesOrder,[salesOrderUpdate.cliente,salesOrderUpdate.direccionEntrega,
            salesOrderUpdate.ciudad,salesOrderUpdate.observaciones,salesOrderUpdate.dia,salesOrderUpdate.mes,salesOrderUpdate.anio,salesOrderUpdate.idpedidos]);
         rta=getResponseOk("Pedido actualizado correctamente",{salesOrderUpdate});
         return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Pedido actualizado correctamente',
            salesOrders:[salesOrderUpdate]
         });

     } catch (error) {
         rta=getResponseError("Error al actualizar el pedido");
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({
             OK:false,
             statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
             statusDescription:'Error al actualizar pedido',
             errors:[
                 {
                     msg:"Error al actualizar pedido",
                     param:''
                 }
             ]      
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
             return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'El pedido no existe',
                errors:[
                    {
                        msg:"El pedido no existe",
                        param:''
                    }
                ]});
         }
         await pool.query(dSalesOrder,[idpedidos]);
         rta=getResponseOk("Pedido eliminado correctamente",{});
         return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Pedido eliminado correctamente',
            salesOrders:[salesOrderExisted]
         });
     } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({
             OK:false,
             statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
             statusDescription:'Error al eliminar pedido',
             errors:[
                 {
                     msg:"Error al eliminar pedido",
                     param:''
                 }
             ]      
         });
     }
 }

 const getPedidos=async(req,res=response)=>{
     try {
         const pedidosL=await pool.query(qSalesOrder);
         if(pedidosL.length===0){
            return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'No hay resultados de pedidos',
                errors:[
                    {
                        msg:"No hay resultados de pedidos",
                        param:''
                    }
                ]});
         }
         return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Pedidos encontrados',
            salesOrders:[pedidosL]
         });

     } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al consultar pedidos',
            errors:[
                {
                    msg:"Error al consultar pedidos",
                    param:''
                }
            ]      
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
            return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'El pedido no existe',
                errors:[
                    {
                        msg:"El pedido no existe",
                        param:''
                    }
                ]});
        }
        await pool.query(cSalesDetail,[detailOrder.producto,detailOrder.cantidad,detailOrder.precio,detailOrder.impuesto
        ,detailOrder.cliente,detailOrder.ciudad,detailOrder.pedido,detailOrder.tipoProducto,
        detailOrder.anio,detailOrder.mes,detailOrder.dia,detailOrder.unidades,detailOrder.descuento]);
        rta=getResponseOk("Detalle creado correctamente",{detailOrder});
        return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Detalle creado correctamente',
            OrderDetail:[detailOrder]
         });
    } catch (error) {
        
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error creación detalle pedido',
            errors:[
                {
                    msg:"Error creación detalle pedido",
                    param:''
                }
            ]      
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
            return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'El detalle no existe',
                errors:[
                    {
                        msg:"El detalle no existe",
                        param:''
                    }
                ]});
        }
        const salesDetailQuery=getSalesDetailFromQuery(salesDetailExisted);
        rta=getResponseOk("Detalle encontrado",{salesDetailQuery});
        return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Detalle encontrado',
            OrderDetail:[salesDetailExisted]
         });
    } catch (error) {
        rta=getResponseError("Error consulta detalle pedido");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error consulta detalle pedido',
            errors:[
                {
                    msg:"Error consulta detalle pedido",
                    param:''
                }
            ]      
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
            return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'El detalle no existe',
                errors:[
                    {
                        msg:"El detalle no existe",
                        param:''
                    }
                ]});
        }
        await pool.query(uSalesDetail,[salesDetailUpdate.producto,salesDetailUpdate.cantidad,salesDetailUpdate.precio,salesDetailUpdate.impuesto,
            salesDetailUpdate.cliente,salesDetailUpdate.ciudad,salesDetailUpdate.pedido,salesDetailUpdate.tipoProducto,
            salesDetailUpdate.anio,salesDetailUpdate.mes,salesDetailUpdate.dia,
            salesDetailUpdate.unidades,
            salesDetailUpdate.descuento,
            salesDetailUpdate.iddetallePedido]);
        rta=getResponseOk("Detalle actualizado correctamente",{salesDetailUpdate});
        return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Detalle actualizado correctamente',
            OrderDetail:[salesDetailUpdate]
         });
    } catch (error) {
        rta=getResponseError("Error actualización detalle pedido");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error actualización detalle pedido',
            errors:[
                {
                    msg:"Error actualización detalle pedido",
                    param:''
                }
            ]      
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
            return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'El detalle no existe',
                errors:[
                    {
                        msg:"El detalle no existe",
                        param:''
                    }
                ]});
        }
        await pool.query(dSalesDetail,[iddetallePedido]);
        rta=getResponseOk("Detalle eliminado correctamente",{iddetallePedido});
        return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Detalle eliminado correctamente',
            OrderDetail:[salesDetailExisted]
         });
    } catch (error) {
        rta=getResponseError("Error eliminación detalle pedido");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error eliminación detalle pedido',
            errors:[
                {
                    msg:"Error eliminación detalle pedido",
                    param:''
                }
            ]      
        });
    }
}
 
/**
 * Obtiene los detalles de un pedido
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const getDetailByOrder=async(req,res=response)=>{
    try {
        const pedido=req.params.pedido;
        if(pedido===null || pedido===""){
            return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'El pedido no es valido',
                errors:[
                    {
                        msg:"El pedido no es valido",
                        param:''
                    }
                ]});
        }
        let cmd= `${qSalesDetail} WHERE pedido=${pedido}`
        const detallesPedido=await pool.query(cmd);
        if(detallesPedido.length===0){
            return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'No se encontraron detalles para el pedido',
                errors:[
                    {
                        msg:"No se encontraron detalles para el pedido",
                        param:''
                    }
                ]});
        }
        return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Detalles encontrados',
            OrderDetail:[detallesPedido]
         });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error consulta detalle pedido',
            errors:[
                {
                    msg:"Error consulta detalle pedido",
                    param:''
                }
            ]      
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
            return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'Ya existe una devolucion del mismo producto en el mismo pedido',
                errors:[
                    {
                        msg:"Ya existe una devolucion del mismo producto en el mismo pedido",
                        param:''
                    }
                ]});
        }
        await pool.query(cDevoluciones,[newDevolucion.pedido,newDevolucion.producto,newDevolucion.cantidad,
            newDevolucion.precio,newDevolucion.impuesto,newDevolucion.observaciones,
            newDevolucion.unidades,
            newDevolucion.descuento
        ]);
            rta=getResponseOk("Devolucion creada correctamente",{newDevolucion});
            return res.status(StatusCodes.OK).json({
                OK:true,
                statusCode:StatusCodes.OK,
                statusDescription:'Devolucion creada correctamente',
                devoluciones:[newDevolucion]
             });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al crear devolución',
            errors:[
                {
                    msg:"Error al crear devolución",
                    param:''
                }
            ]      
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
            return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'La devolucion no existe',
                errors:[
                    {
                        msg:"La devolucion no existe",
                        param:''
                    }
                ]});
        }
        const DevolucionFind = getDevolucionesFromQuery(devolucionExisted);
        rta=getResponseOk("Devolucion encontrada",{DevolucionFind});
        return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Devolucion encontrada',
            devoluciones:[newDevolucion]
         });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al consultar devolución',
            errors:[
                {
                    msg:"Error al consultar devolución",
                    param:''
                }
            ]      
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
            return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'La devolucion no existe',
                errors:[
                    {
                        msg:"La devolucion no existe",
                        param:''
                    }
                ]});
        }
        await pool.query(uDevoluciones,[DevolucionUpdate.pedido,DevolucionUpdate.producto,DevolucionUpdate.cantidad,
            DevolucionUpdate.precio,DevolucionUpdate.impuesto,DevolucionUpdate.observaciones,
            DevolucionUpdate.unidades,
            DevolucionUpdate.descuento,
            DevolucionUpdate.iddevoluciones]);
        rta=getResponseOk("Devolucion actualizada correctamente",{DevolucionUpdate});
        return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Devolucion actualizada',
            devoluciones:[DevolucionUpdate]
         });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al actualizar devolución',
            errors:[
                {
                    msg:"Error al actualizar devolución",
                    param:''
                }
            ]      
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
            return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'La devolucion no existe',
                errors:[
                    {
                        msg:"La devolucion no existe",
                        param:''
                    }
                ]});
        }
        await pool.query(dDevoluciones,[iddevoluciones]);
        rta=getResponseOk("Devolucion eliminada correctamente",{iddevoluciones});
        return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Devolucion eliminada',
            devoluciones:[devolucionExisted]
         });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al eliminar devolución',
            errors:[
                {
                    msg:"Error al eliminar devolución",
                    param:''
                }
            ]      
        });
    }
}

/**
 * Obtiene todas las devoluciones
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const getAllDevoluciones=async(req,res=response)=>{
    try {
        const devolucionesL=await pool.query(qDevoluciones);
        if (devolucionesL.length===0) {
            return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'No hay devoluciones',
                errors:[
                    {
                        msg:"No hay devoluciones",
                        param:''
                    }
                ]});
        }
        return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Devoluciones encontradas',
            devoluciones:[devolucionesL]
         });
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al consultar devoluciones',
            errors:[
                {
                    msg:"Error al consultar devoluciones",
                    param:''
                }
            ]      
        });
    }
}


/**
 * Obtiene todas las devoluciones
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
 const getAllDevolucionesByOrder=async(req,res=response)=>{
    try {
        const pedido=req.params.pedido;
        if(pedido===null || pedido===""){
            return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'El pedido no es valido',
                errors:[
                    {
                        msg:"El pedido no es valido",
                        param:''
                    }
                ]});
        }
        let cmd=`${qDevoluciones} WHERE PEDIDO=${pedido}`;
        const devolucionesL=await pool.query(cmd);
        if (devolucionesL.length===0) {
            return res.status(StatusCodes.CONFLICT).json({ 
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'No hay devoluciones',
                errors:[
                    {
                        msg:"No hay devoluciones",
                        param:''
                    }
                ]});
        }
        return res.status(StatusCodes.OK).json({
            OK:true,
            statusCode:StatusCodes.OK,
            statusDescription:'Devoluciones encontradas',
            devoluciones:[devolucionesL]
         });
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al consultar devoluciones',
            errors:[
                {
                    msg:"Error al consultar devoluciones",
                    param:''
                }
            ]      
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
     deleteDevolution,
     getPedidos,
     getDetailByOrder,
     getAllDevoluciones,
     getAllDevolucionesByOrder
 }