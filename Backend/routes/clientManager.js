const {Router} =require('express');
const {check} = require('express-validator');
const { validationCamps } = require('../middlewares/validations-camps');
const { ValidateJWT } = require('../middlewares/validation-jwt');
const {createClient,findCliente,updateCliente,deleteClient,createPets,findPet,deletePet,updatePet, getClients, getMascotas, getAllClient}=require('../controller/clientController');
const router=Router();

//#region Cliente

/**Ruta creación cliente */
router.post('/createClient',[
    check('documento','Campo requerido').not().isEmpty().isNumeric(),
    check('tipodocumento','Campo requerido').not().isEmpty().isNumeric(),
    check('nombre','Campo requerido').not().isEmpty().isLength({min:3,max:450}),
    check('celular','Campo requerido').not().isEmpty().isNumeric(),
    check('direccion','Campo requerido').not().isEmpty().isLength({min:3,max:450}),
    check('ciudad','Campo requerido').not().isEmpty().isNumeric(),
    check('email','Campo requerido').not().isEmpty().isLength({min:3,max:450}).isEmail(),
    validationCamps,
    ValidateJWT
],createClient);

/**Ruta consulta cliente */
router.post('/findClient',[
    check('documento','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],findCliente);


/**Ruta actualización cliente */
router.post('/updateClient',[
    check('documento','Campo requerido').not().isEmpty().isNumeric(),
    check('tipodocumento','Campo requerido').not().isEmpty().isNumeric(),
    check('nombre','Campo requerido').not().isEmpty().isLength({min:3,max:450}),
    check('celular','Campo requerido').not().isEmpty().isNumeric(),
    check('direccion','Campo requerido').not().isEmpty().isLength({min:3,max:450}),
    check('ciudad','Campo requerido').not().isEmpty().isNumeric(),
    check('email','Campo requerido').not().isEmpty().isLength({min:3,max:450}),
    validationCamps,
    ValidateJWT
],updateCliente);


/**Ruta eliminación cliente */
router.post('/deleteClient',[
    check('documento','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],deleteClient);

router.get('/Client/:criterio/:tipo',[ValidateJWT],getClients);

router.get('/getAllClients',[ValidateJWT],getAllClient);


//#endregion

//#region mascotas
/**Ruta creación de mascotas */
router.post('/createPet',[
    check('propietario','Campo requerido').not().isEmpty().isNumeric(),
    check('nombre','Campo requerido').not().isEmpty().isLength({min:3,max:300}),
    check('tipo','Campo requerido').not().isEmpty().isLength({min:3,max:300}),
    validationCamps,
    ValidateJWT
],createPets);

/**Ruta búsqueda de mascotas */
router.get('/findPet',[
    check('idmascotas','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],findPet);

/**Ruta Actualización de mascotas */
router.post('/updatePet',[
    check('propietario','Campo requerido').not().isEmpty().isNumeric(),
    check('nombre','Campo requerido').not().isEmpty().isLength({min:3,max:300}),
    check('tipo','Campo requerido').not().isEmpty().isLength({min:3,max:300}),
    check('idmascotas','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],updatePet);

/**Ruta Eliminación de mascotas */
router.post('/deletePet',[
    check('idmascotas','Campo requerido').not().isEmpty().isNumeric(),
    validationCamps,
    ValidateJWT
],deletePet);

/**Ruta búsqueda de mascotas con criterio*/
router.get('/Mascotas/:criterio/:tipo',[ValidateJWT],getMascotas);
//#endregion

module.exports=router;