/**Biblioteca encargada de la gestión de los token de la aplicacion */ 

const jwt=require('jsonwebtoken');

/**Función que genera un JWT
 * @argument uid uid del usuario
 * @argument name nombre del usuario
 * @returns Promise con JWT
 */
const generateJWT=(uid,name)=>{
    return new Promise((resolve,reject)=>{
        /**Se genera el payload */
        const payload={uid,name};
        const secret=process.env.Secret_JWT;

        /**Función que genera el token 
         * Arg 1: payload
         * Arg 2: secret (llave de cifrado)
         * Arg 3: Opciones de configuración
         * Arg 4: callback que se dispara despues de finalizar el proceso de creación
         * se pasan como argumentos el error y el token para retornar al usuario
        */
        jwt.sign(payload,secret,{
            expiresIn:'2h'
        },(err,token)=>{
            if (err) {
                console.log(err);
                //Se retorna con reject al usuario los errores
                reject('No se pudo generar el token');
            }
            //Se retorna al usuario el éxito de mis promesas
            resolve(token);
        })
    });
}

module.exports={
    generateJWT,
}