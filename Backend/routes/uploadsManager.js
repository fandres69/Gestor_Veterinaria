const {Router} =require('express');
const {check} = require('express-validator');
const { validationCamps } = require('../middlewares/validations-camps');
const { ValidateJWT } = require('../middlewares/validation-jwt');
const {LoadUserFile,getUserFile}=require('../controller/uploadsController');
const router=Router();
const multer=require('../middlewares/loadFiles');

router.post('/userFile/:documento',
 [
    ValidateJWT,
    multer.single('image')
 ],LoadUserFile);

router.post('/getUserFile/:documento',[ValidateJWT],getUserFile)



module.exports=router;