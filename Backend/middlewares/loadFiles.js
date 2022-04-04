
const {response}=require('express');
const multer  = require('multer');
const dirUploads=process.env.dirUploads;
const path = require('path');


const storage = multer.diskStorage({
    destination:dirUploads,
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
  });


module.exports=multer({storage});