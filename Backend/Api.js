const express= require('express');
require('dotenv').config();
/**Servidor web */
const Api=express();


// Api.get('/gveterinaria',(req,res)=>{
//     res.status(200).send({
//         "code":200,
//         "status":"ok",
//         "message":"run server"
//     })
// })

/**Puerto de escucha de la aplicacion */
//const port=process.env.APIPORT;
const port=3301;

/**Se configura middelwere para obtener informacion de body de 
 * las peticiones al Api
 */
Api.use(express.json())

Api.use('/gveterinaria',require('./routes/auth'));


Api.listen(port,()=>{
    console.log(`Api is runin in port: ${port}`);
})
