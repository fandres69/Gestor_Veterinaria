const express= require('express');
require('dotenv').config();
/**Servidor web */
const Api=express();

/**Puerto de escucha de la aplicación */
const port=process.env.APIPORT||3301;

/**Se configura middleware para obtener información de body de 
 * las peticiones al Api
 */
Api.use(express.json())

/**Configuración route modulo Login */
Api.use('/gveterinaria/login',require('./routes/auth'));

/**Configuración route modulo stockManager */
Api.use('/gveterinaria/stockManager',require('./routes/stockManager'));

/**Api start */
Api.listen(port,()=>{
    console.log(`Api is running in port: ${port}`);
})
