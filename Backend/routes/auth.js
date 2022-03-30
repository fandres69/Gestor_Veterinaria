const {Router} =require('express');
const {check} = require('express-validator');
const { validationCamps } = require('../middlewares/validations-camps');
const { ValidateJWT } = require('../middlewares/validation-jwt');
const {creareUser,loginUser, qUser,dUsuario, uUser, validToken, updPassword}= require('../controller/authController');
const router=Router();


/**Petición para creación de un usuario */
router.post('/newUser',
[
    check('documento','Campo documento requerido entre 6 y 12 números').not().isEmpty().isNumeric().isLength({min:6,max:12}),
    check('nombre','Campo obligatorio de mas de 3 caracteres').not().isEmpty().isLength({min:3,max:250}),
    check('tipoDocumento','Campo requerido').not().isEmpty(),
    check('email','Campo obligatorio email ****@**.**').not().isEmpty().isEmail(),
    check('celular','Campo teléfono requerido').not().isEmpty().isNumeric().isLength({min:10, max:13}),
    check('password','Campo Obligatorio de mas de 6 caracteres, alfanumérica con mínimo una mayúscula y carácter especial').not().isEmpty().isLength({min:8}).isStrongPassword(),
    check('usuarioN','Campo usuarioN requerido').not().isEmpty().isLength({max:12}),
    validationCamps
],creareUser);


/**Petición para consulta de un usuario */
router.post('/login',
[
    check('password','Campo Obligatorio de mas de 6 caracteres, alfanumérica con mínimo una mayúscula y carácter especial').not().isEmpty().isLength({min:8}).isStrongPassword(),
    check('usuarioN','Campo usuarioN requerido').not().isEmpty().isLength({max:12}),
    validationCamps 
],
loginUser
);

/**Petición búsqueda un usuario */
router.post('/find',[
    check('documento','Campo documento requerido entre 6 y 12 números').not().isEmpty().isNumeric().isLength({min:6,max:12}),
    validationCamps,
    ValidateJWT
],qUser);

/**Petición eliminación usuario */
router.post('/delete',[
    check('documento','Campo documento requerido entre 6 y 12 números').not().isEmpty().isNumeric().isLength({min:6,max:12}),
    validationCamps,
    ValidateJWT
],dUsuario);

/**Petición actualización usuario */
router.post('/update',[
    check('nombre','Campo obligatorio de mas de 3 caracteres').not().isEmpty().isLength({min:3,max:250}),
    check('tipoDocumento','Campo requerido').not().isEmpty(),
    check('celular','Campo teléfono requerido').not().isEmpty().isNumeric().isLength({min:10, max:13}),
    check('email','Campo obligatorio email ****@**.**').not().isEmpty().isEmail(),
    check('usuarioN','Campo usuarioN requerido').not().isEmpty().isLength({max:12}),
    check('activo','Campo estado activo requerido').not().isEmpty().isLength({max:1,max:1}),
    check('documento','Campo documento requerido entre 6 y 12 números').not().isEmpty().isNumeric().isLength({min:6,max:12}),
    validationCamps,
    ValidateJWT
],uUser);

router.post('/updPass',[
    check('documento','Campo documento requerido entre 6 y 12 números').not().isEmpty().isNumeric().isLength({min:6,max:12}),
    check('password','Campo Obligatorio de mas de 6 caracteres, alfanumérica con mínimo una mayúscula y carácter especial').not().isEmpty().isLength({min:8}).isStrongPassword(),
    check('passwordActual','Campo Obligatorio de mas de 6 caracteres, alfanumérica con mínimo una mayúscula y carácter especial').not().isEmpty().isLength({min:8}).isStrongPassword(),
    validationCamps,
    ValidateJWT
],updPassword);

router.post('/validToken',[ValidateJWT],validToken)

module.exports =router;