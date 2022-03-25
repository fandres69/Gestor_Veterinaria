const express= require('express');
const cors=require('cors');
require('dotenv').config();
/**Servidor web */
const Api=express();

/**Puerto de escucha de la aplicación */
const port=process.env.APIPORT||3301;

/**Se configura middleware para obtener información de body de 
 * las peticiones al Api
 */
Api.use(express.json());
Api.use(cors());

/**Configuración route modulo Login */
Api.use('/api/gveterinaria/login',require('./routes/auth'));

/**Configuración route modulo stockManager */
Api.use('/api/gveterinaria/stockManager',require('./routes/stockManager'));

/**Configuración route modulo Ventas */
Api.use('/api/gveterinaria/salesManager',require('./routes/salesManager'));

/**Configuración route modulo datos maestro */
Api.use('/api/gveterinaria/dataMaster',require('./routes/dataMasterManager'));

Api.use('/api/gveterinaria/clientManager',require('./routes/clientManager'));

/**Api start */
Api.listen(port,()=>{
    console.log(`Api is running in port: ${port}`);
})
