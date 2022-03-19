const {Router} = require('express');
const {check} = require('express-validator');
const { validationCamps } = require('../middlewares/validations-camps');
const { ValidateJWT } = require('../middlewares/validation-jwt');
const {creareUser,qUser}= require('../controller/authController');
const {database}= require('../database/configDB')
const {pool}=require('../database/database')
const router=Router();

/**Petición para creación de un usuario */
router.post('/login/newUser',
[
    check('nombre','Campo obligatorio de mas de 3 caracteres').not().isEmpty().isLength({min:3}),
    check('email','Campo obligatorio de mas de 3 caracteres').isEmail(),
    check('celular','Campo teléfono requerido').not().isEmpty().isNumeric().isLength({min:10}),
    check('documento','Campo documento requerido').not().isEmpty().isNumeric().isLength({min:6,max:12}),
    check('tipoDocumento','Campo requerido').not().isEmpty(),
    check('password','Campo Obligatorio de mas de 6 caracteres, alfanumérica con mínimo una mayúscula y carácter especial').not().isEmpty().isLength({min:6}).isStrongPassword(),
],creareUser);


/**Petición para consulta de un usuario */
router.get('/login',qUser);

module.exports =router;