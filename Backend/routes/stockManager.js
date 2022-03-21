/**
 * Modulo de rutas administración de productos, servicios e inventarios
 */

const {Router} =require('express');
const {check} = require('express-validator');
const { validationCamps } = require('../middlewares/validations-camps');
const { ValidateJWT } = require('../middlewares/validation-jwt');
const {createProduct,updateProduct,readProduct,deleteProduct,createStock,readStock,updateStock,deleteStock,
    createServiceV,readServiceV,updateServiceV,deleteServiceV}=require('../controller/stockManagerController');
const router=Router();

//#region Productos
/**Ruta para creación de productos */
router.post('/newProduct',[
    check('producto','Campo requerido').not().isEmpty().isLength({min:3,max:300}),
    check('ciudad','Campo requerido').not().isEmpty().isNumeric(),
    check('presentacion','Campo opcional'),
    check('unEmpaque','Campo requerido'),
    check('descripcion','Campo requerido').isLength({min:0,max:500}),
    validationCamps,
    ValidateJWT
],createProduct);

/**Ruta actualización de productos */
router.put('/updateProduct',[
    check('producto','Campo requerido').not().isEmpty().isLength({min:3,max:300}),
    check('idProductos','Campo requerido').not().isEmpty().isNumeric(),
    check('ciudad','Campo requerido').not().isEmpty().isNumeric(),
    check('presentacion','Campo opcional'),
    check('unEmpaque','Campo requerido').isNumeric(),
    check('descripcion','Campo requerido').isLength({min:0,max:500}),
    validationCamps,
    ValidateJWT
],updateProduct);

/**Ruta consulta productos */
router.get('/findProduct',[
    check('idProductos','Campo requerido').not().isEmpty(),
    validationCamps,
    ValidateJWT
],readProduct);

/**Ruta eliminación de producto */
router.post('/deleteProduct',[
    check('idProductos','Campo requerido').not().isEmpty(),
    validationCamps,
    ValidateJWT
],deleteProduct);

//#endregion


//#region Inventarios
/**Ruta creación inventario */
router.post('/newStock',[
    check('producto','Campo requerido').not().isEmpty().isNumeric(),
    check('stock','Campo requerido').not().isEmpty().isNumeric(),
    check('stockMin','Campo requerido').isNumeric(),
    check('stockMax','Campo requerido').isNumeric(),
    check('PrecioVenta','Campo requerido').not().isEmpty().isNumeric(),
    check('impuesto','Campo requerido').isNumeric(),
    check('descuento','Campo requerido').isNumeric(),
    validationCamps,
    ValidateJWT
],createStock);

/**Ruta actualización inventario */
router.put('/updateStock',[
    check('producto','Campo requerido').not().isEmpty().isNumeric(),
    check('stock','Campo requerido').not().isEmpty().isNumeric(),
    check('stockMin','Campo requerido').isNumeric(),
    check('stockMax','Campo requerido').isNumeric(),
    check('PrecioVenta','Campo requerido').not().isEmpty().isNumeric(),
    check('impuesto','Campo requerido').isNumeric(),
    check('descuento','Campo requerido').isNumeric(),
    check('idInventario','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],updateStock);

/**Ruta consulta inventario */
router.get('/findStock',[
    check('idInventario','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],readStock);

/**Ruta Eliminación inventario */
router.post('/deleteStock',[
    check('idInventario','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],deleteStock);

//#endregion

//#region Servicios
/**Ruta creación servicio */
router.post('/newService',[
    check('servicio','Campo requerido').not().isEmpty().isLength({min:3, max:300}),
    check('descripcion','Campo requerido').not().isEmpty().isLength({min:3, max:300}),
    check('precio','Campo requerido').not().isEmpty().isNumeric(),
    check('impuesto','Campo requerido').isNumeric(),
    check('descuento','Campo requerido').isNumeric(),
    validationCamps,
    ValidateJWT
],createServiceV);

/**Ruta actualización servicio */
router.put('/updateService',[
    check('servicio','Campo requerido').not().isEmpty().isLength({min:3, max:300}),
    check('descripcion','Campo requerido').not().isEmpty().isLength({min:3, max:300}),
    check('precio','Campo requerido').not().isEmpty().isNumeric(),
    check('impuesto','Campo requerido').isNumeric(),
    check('descuento','Campo requerido').isNumeric(),
    check('idServicios','Campo requerido').isNumeric(),
    validationCamps,
    ValidateJWT
],updateServiceV);

/**Ruta consulta servicios */
router.get('/findService',[
    check('idServicios','Campo requerido').isNumeric(),
    validationCamps,
    ValidateJWT 
],readServiceV);

/**Ruta borrado servicios */
router.post('/deleteService',[
    check('idServicios','Campo requerido').isNumeric(),
    validationCamps,
    ValidateJWT
],deleteServiceV);

//#endregion

module.exports =router;