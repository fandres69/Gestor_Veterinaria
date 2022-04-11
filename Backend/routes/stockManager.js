/**
 * Modulo de rutas administración de productos, servicios e inventarios
 */

const {Router} =require('express');
const {check} = require('express-validator');
const { validationCamps } = require('../middlewares/validations-camps');
const { ValidateJWT } = require('../middlewares/validation-jwt');
const {createProduct,updateProduct,readProduct,deleteProduct,createStock,readStock,updateStock,deleteStock,
    createServiceV,readServiceV,updateServiceV,deleteServiceV,createStockIn,readStockIn,updateStockIn,deleteStockIn, getProducts, getStocks, getServicios, getStocksIn, getAllProducts, getStockId, getCompleteStock, getAllStockIn, getAllServicios
}=require('../controller/stockManagerController');
const { route } = require('./auth');
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
router.post('/updateProduct',[
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
router.post('/findProduct',[
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

/**Ruta que consulta productos a partir de un criterio de búsqueda */
router.get('/getProducts/:criterio',[ValidateJWT],getProducts);

/**Ruta que consulta un inventario por Id */
router.get('/getAllProducts',[ValidateJWT],getAllProducts);

/**Ruta que obtiene el listado de inventarios */
router.get('/getCompleteStock',[ValidateJWT],getCompleteStock);

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
router.post('/updateStock',[
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
router.post('/findStock',[
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

/**Ruta búsqueda inventario por criterio */
router.get('/getStocks/:criterio',[ValidateJWT],getStocks);

/**Ruta búsqueda stock por id */
router.get('/getStockId/:producto',[ValidateJWT],getStockId);

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
router.post('/updateService',[
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
router.post('/findService',[
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

/**Ruta que consulta servicios a partir de un criterio de búsqueda */
router.get('/getServicios/:criterio',[ValidateJWT],getServicios);

/**Ruta que consulta todos los servicios */
router.get('/getAllServicios',[ValidateJWT],getAllServicios);

//#endregion

//#region Ingresos de inventario

/**Ruta para creación de un ingreso de inventario */
router.post('/createStockIn',[
    check('producto','Campo requerido').not().isEmpty().isNumeric(),
    check('cantidad','Campo requerido').not().isEmpty().isNumeric(),
    check('Precio','Campo requerido').not().isEmpty().isNumeric(),
    check('dia','Campo requerido').not().isEmpty().isNumeric(),
    check('mes','Campo requerido').not().isEmpty().isNumeric(),
    check('anio','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],createStockIn);

/**Ruta para consulta de un ingreso de inventario */
router.post('/findStockIn',[
    check('idingresosInventario','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],readStockIn);

/**Ruta para actualización de un ingreso de inventario */
router.post('/updateStockIn',[
    check('producto','Campo requerido').not().isEmpty().isNumeric(),
    check('cantidad','Campo requerido').not().isEmpty().isNumeric(),
    check('Precio','Campo requerido').not().isEmpty().isNumeric(),
    check('dia','Campo requerido').not().isEmpty().isNumeric(),
    check('mes','Campo requerido').not().isEmpty().isNumeric(),
    check('anio','Campo requerido').not().isEmpty().isNumeric(),
    check('idingresosInventario','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],updateStockIn);

/**Ruta para eliminación de un ingreso de inventario */
router.post('/deleteStockIn',[
    check('idingresosInventario','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],deleteStockIn);

/**Ruta que consulta ingresos de inventario a partir de un criterio de búsqueda */
router.get('/getStocksIn/:criterio',[ValidateJWT],getStocksIn);

router.get('/getAllStocksIn',[ValidateJWT],getAllStockIn);

//#endregion

module.exports =router;