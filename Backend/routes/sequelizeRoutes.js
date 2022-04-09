const {Router} =require('express');
const { CreatePedido } = require('../controller/sequilizer/sqController');
const router=Router();


router.post('/cPedido',[],CreatePedido);

module.exports=router;