const express= require('express');
const cors=require('cors');
require('dotenv').config();

const path=require('path');
/**Servidor web */
const Api=express();

/**Puerto de escucha de la aplicación */
const port=process.env.APIPORT||3301;

/**Se configura middleware para obtener información de body de 
 * las peticiones al Api
 */
Api.use(express.json());
Api.use(cors());

const multer  = require('multer');
const { LoadUserFile } = require('./controller/uploadsController');
const { json } = require('express');
const dirUploads=process.env.dirUploads;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dirUploads)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

const upload = multer({storage:this.storage});




//Api.use('/uploads',express.static(path.resolve('uploads')));
/**Configuración route modulo Login */
Api.use('/api/gveterinaria/login',require('./routes/auth'));

/**Configuración route modulo stockManager */
Api.use('/api/gveterinaria/stockManager',require('./routes/stockManager'));

/**Configuración route modulo Ventas */
Api.use('/api/gveterinaria/salesManager',require('./routes/salesManager'));

/**Configuración route modulo datos maestro */
Api.use('/api/gveterinaria/dataMaster',require('./routes/dataMasterManager'));
/**Configuración route modulo clientes */
Api.use('/api/gveterinaria/clientManager',require('./routes/clientManager'));

Api.use('/api/gveterinaria/uploads',require('./routes/uploadsManager'));

/**Api start */
Api.listen(port,()=>{
    console.log(`Api is running in port: ${port}`);
})
