const {Router} =require('express');
const {check} = require('express-validator');
const { validationCamps } = require('../middlewares/validations-camps');
const { ValidateJWT } = require('../middlewares/validation-jwt');
const { getAllSales, getAniosVentas } = require('../controller/dashBoardController');
const router=Router();


/**Ruta ventas */
router.get('/getAllVentas',[ValidateJWT],getAllSales);
/**Ruta años */
router.get('/getYears',[ValidateJWT],getAniosVentas);




module.exports=router;