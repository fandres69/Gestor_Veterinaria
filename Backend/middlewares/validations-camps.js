/**Dentro de los middleware se debe llamar la instrucción next
 * para que la ejecucion continue.
 */

const {response}=require('express');
const {validationResult} =require('express-validator');

/**custom middleware
 * 
 */
const validationCamps=(req,res=response,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(409).json({
            errors:errors.array()
        });
    }
    next();
}

module.exports={
    validationCamps,
}