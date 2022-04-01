/**
 * Modulo de rutas administración datos maestros
 */

 const {Router} =require('express');
 const {check} = require('express-validator');
 const { validationCamps } = require('../middlewares/validations-camps');
 const { ValidateJWT } = require('../middlewares/validation-jwt');
 const {createCity,readCity,updateCity,deleteCity,createTypeDocument,readTypeDocument,updateTypeDocument,deleteTypeDocument, searchC, searchTD}=require('../controller/dataMasterController');
const { allTypeDoc } = require('../controller/authController');
 const router=Router();
//#region ciudades

 /**Ruta creación de ciudades */
 router.post('/newCity',[
    check('codigo','Campo requerido').not().isEmpty().isNumeric(),
    check('codigoDto','Campo requerido').not().isEmpty().isNumeric(),
    check('Ciudad','Campo requerido').not().isEmpty().isLength({min:3,max:200}),
    check('Departamento','Campo requerido').not().isEmpty().isLength({min:3,max:150}),
    validationCamps,
    ValidateJWT
 ],createCity);

/**Ruta consulta ciudades */
 router.get('/city',[
    check('codigo','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
 ],readCity);

 /**Ruta actualización ciudades */
 router.post('/updateCity',[
    check('codigo','Campo requerido').not().isEmpty().isNumeric(),
    check('codigoDto','Campo requerido').not().isEmpty().isNumeric(),
    check('Ciudad','Campo requerido').not().isEmpty().isLength({min:3,max:200}),
    check('Departamento','Campo requerido').not().isEmpty().isLength({min:3,max:150}),
    validationCamps,
    ValidateJWT
 ],updateCity);

/**Ruta eliminación ciudades */
 router.post('/deleteCity',[
    check('codigo','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
 ],deleteCity);

router.get('/cities/:criterio',[ValidateJWT],searchC);

 //#endregion

 //#region tipo documento

 /**Ruta creación tipo documento */
 router.post('/newTypeDoc',[
    check('tipoDocumento','Campo requerido').not().isEmpty().isLength({min:3,max:200}),
    validationCamps,
    ValidateJWT
 ],createTypeDocument);

 /**Ruta consulta tipo documento */
 router.get('/TypeDoc',[
    check('idtipoDocumento','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
 ],readTypeDocument);

 /**Ruta actualización tipo documento  */
 router.post('/updateTypeDoc',[
    check('tipoDocumento','Campo requerido').not().isEmpty().isLength({min:3,max:200}),
    check('idtipoDocumento','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
 ],updateTypeDocument);

 /**Ruta eliminación tipo documento  */
 router.post('/deleteTypeDoc',[
    check('idtipoDocumento','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
 ],deleteTypeDocument);

 router.post('/allTypeDoc',[
   ValidateJWT
 ],allTypeDoc)


 router.get('/searchTypeDoc/:criterio',[ValidateJWT],searchTD);
 //#endregion
 module.exports=router;