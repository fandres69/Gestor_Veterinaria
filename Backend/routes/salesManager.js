/**
 * Modulo de rutas administración de ventas
 */


 const {Router} =require('express');
 const {check} = require('express-validator');
 const { validationCamps } = require('../middlewares/validations-camps');
 const { ValidateJWT } = require('../middlewares/validation-jwt');
 const {createPedido,readPedido,updatePedido,deletePedido,createDetailPedido, readDetailPedido,
     updateDetailPedido,deleteDetailPedido, createDevolution,
    updateDevolution,deleteDevolution,readDevolution, getPedidos, getDetailByOrder, getAllDevoluciones, getAllDevolucionesByOrder, cPedidoSquelize, getDetalleView, createBulkDetalle}=require('../controller/salesController');
 const router=Router();

 //#region salesOrder (Pedido)

 /**
  * Ruta creación de pedidos
  */
 router.post('/createOrder',[
    check('cliente','Campo requerido').not().isEmpty().isNumeric(),
    check('direccionEntrega','Campo requerido').not().isEmpty().isLength({min:10,max:450}),
    check('ciudad','Campo requerido').not().isEmpty().isNumeric(),
    check('observaciones','Campo requerido'),
    validationCamps,
    ValidateJWT
 ],createPedido);

 router.post('/cOrder',[
    check('cliente','Campo requerido').not().isEmpty().isNumeric(),
    check('direccionEntrega','Campo requerido').not().isEmpty().isLength({min:10,max:450}),
    check('ciudad','Campo requerido').not().isEmpty().isNumeric(),
    check('observaciones','Campo requerido'),
    validationCamps,
    ValidateJWT
 ],cPedidoSquelize);

/**Ruta consulta pedidos */
 router.post('/findOrder',[
    check('idpedidos','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
 ],readPedido);

/**Ruta actualización de pedidos */
 router.post('/updateOrder',[
    check('cliente','Campo requerido').not().isEmpty().isNumeric(),
    check('direccionEntrega','Campo requerido').not().isEmpty().isLength({min:10,max:450}),
    check('ciudad','Campo requerido').not().isEmpty().isNumeric(),
    check('observaciones','Campo requerido'),
    check('idpedidos','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
 ],updatePedido);

/**Ruta eliminación de pedidos */
 router.post('/deleteOrder',[
    check('idpedidos','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],deletePedido);

/**obtiene el listado de pedidos */
router.get('/getPedidos',[ValidateJWT],getPedidos);

//#endregion

//#region SalesOrderDetail (Detalle pedido)

/**Ruta para creación de detalle de pedidos */
router.post('/createOrderDetail',[
    check('producto','Campo requerido').not().isEmpty().isNumeric(),
    check('cantidad','Campo requerido').not().isEmpty().isNumeric(),
    check('precio','Campo requerido').not().isEmpty().isNumeric(),
    check('impuesto','Campo requerido').not().isEmpty().isNumeric(),
    check('cliente','Campo requerido').not().isEmpty().isNumeric(),
    check('ciudad','Campo requerido').not().isEmpty().isNumeric(),
    check('pedido','Campo requerido').not().isEmpty().isNumeric(),
    check('tipoProducto','Campo requerido').not().isEmpty().isLength({min:1,max:2}),    
    check('anio','Campo requerido').not().isEmpty().isNumeric(),
    check('mes','Campo requerido').not().isEmpty().isNumeric(),
    check('dia','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],createDetailPedido);

/**Ruta para la consulta de detalle de pedidos */
router.post('/findOrderDetail',[
    check('iddetallePedido','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],readDetailPedido);

/**Ruta para la actualización de detalle de pedidos */
router.post('/updateOrderDetail',[
    check('producto','Campo requerido').not().isEmpty().isNumeric(),
    check('cantidad','Campo requerido').not().isEmpty().isNumeric(),
    check('precio','Campo requerido').not().isEmpty().isNumeric(),
    check('impuesto','Campo requerido').not().isEmpty().isNumeric(),
    check('cliente','Campo requerido').not().isEmpty().isNumeric(),
    check('ciudad','Campo requerido').not().isEmpty().isNumeric(),
    check('pedido','Campo requerido').not().isEmpty().isNumeric(),
    check('tipoProducto','Campo requerido').not().isEmpty().isLength({min:1,max:2}),    
    check('anio','Campo requerido').not().isEmpty().isNumeric(),
    check('mes','Campo requerido').not().isEmpty().isNumeric(),
    check('dia','Campo requerido').not().isEmpty().isNumeric(),
    check('iddetallePedido','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],updateDetailPedido);

/**Ruta para la eliminación de detalle de pedidos */
router.post('/deleteOrderDetail',[
    check('iddetallePedido','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],deleteDetailPedido);

/**Ruta para obtener los detalles de un pedido */
router.get('/getDetailByOrder/:pedido',[ValidateJWT],getDetailByOrder);

/**Ruta que obtiene la consulta de la vista de inventarió */
router.get('/vewDetailInv',[ValidateJWT],getDetalleView);

/**Ruta d=que carga detalles de forma masiva en la DB */
router.post('/bulkDetalles',[
    check('detalles','Campo requerido').not().isEmpty(),
    validationCamps,
],
createBulkDetalle
);
//#endregion

//#region Devoluciones

/**Ruta creación devolucion */
router.post('/createDevolution',[
    check('pedido','Campo requerido').not().isEmpty().isNumeric(),
    check('producto','Campo requerido').not().isEmpty().isNumeric(),
    check('cantidad','Campo requerido').not().isEmpty().isNumeric(),
    check('precio','Campo requerido').not().isEmpty().isNumeric(),
    check('impuesto','Campo requerido').not().isEmpty().isNumeric(),
    check('observaciones','Campo requerido').not().isEmpty().isLength({min:5,max:600}),
    validationCamps,
    ValidateJWT
],createDevolution);

/**Ruta consulta devolucion */
router.post('/findDevolution',[
    check('iddevoluciones','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],readDevolution);

/**Ruta actualización devolucion */
router.post('/updateDevolution',[
    check('pedido','Campo requerido').not().isEmpty().isNumeric(),
    check('producto','Campo requerido').not().isEmpty().isNumeric(),
    check('cantidad','Campo requerido').not().isEmpty().isNumeric(),
    check('precio','Campo requerido').not().isEmpty().isNumeric(),
    check('impuesto','Campo requerido').not().isEmpty().isNumeric(),
    check('observaciones','Campo requerido').not().isEmpty().isLength({min:5,max:600}),
    check('iddevoluciones','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],updateDevolution);

/**Ruta eliminación devolucion */
router.post('/deleteDevolution',[
    check('iddevoluciones','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],deleteDevolution);

/**Ruta para consultar todas las devoluciones */
router.get('/getAllDevoluciones',[ValidateJWT],getAllDevoluciones);

/**Ruta que consulta las devoluciones de un pedido */
router.get('/getAllDevolucionesByOrder/:pedido',[ValidateJWT],getAllDevolucionesByOrder);

//#endregion


module.exports =router;