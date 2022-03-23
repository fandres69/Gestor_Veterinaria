/**
 * Modulo de rutas administración de ventas
 */


 const {Router} =require('express');
 const {check} = require('express-validator');
 const { validationCamps } = require('../middlewares/validations-camps');
 const { ValidateJWT } = require('../middlewares/validation-jwt');
 const {createPedido,readPedido,updatePedido,deletePedido,createDetailPedido, readDetailPedido,
     updateDetailPedido,deleteDetailPedido, createDevolution,
    updateDevolution,deleteDevolution,readDevolution}=require('../controller/salesController');
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

/**Ruta consulta pedidos */
 router.get('/findOrder',[
    check('idpedidos','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
 ],readPedido);

/**Ruta actualización de pedidos */
 router.put('/updateOrder',[
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
router.get('/findOrderDetail',[
    check('iddetallePedido','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],readDetailPedido);

/**Ruta para la actualización de detalle de pedidos */
router.put('/updateOrderDetail',[
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
router.get('/findDevolution',[
    check('iddevoluciones','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],readDevolution);

/**Ruta actualización devolucion */
router.put('/updateDevolution',[
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

//#endregion


module.exports =router;