const {response}=require('express');
const {pool}=require('../database/database');
const {StatusCodes}= require('http-status-codes');

/**
 * Retorna las ventas
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const getAllSales=async(req,res=response)=>{
    try {
        let cmd='SELECT * FROM ventas';
        const ventas= await pool.query(cmd);
        if(ventas.length===0){
            return res.status(StatusCodes.CONFLICT)
            .json({
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'Error al generar ventas',
                errors:[
                    {
                        msg:"Error al generar ventas",
                        param:''
                    }
                ]
            });
        }
        return res.status(StatusCodes.OK)
        .json({
            OK:false,
            statusCode:StatusCodes.OK,
            statusDescription:'Ventas generadas',
            ventas:ventas
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al generar ventas',
            errors:[
                {
                    msg:"Error al generar ventas",
                    param:''
                }
            ]
        });
    }
}

/**
 * Retorna los años de ventas
 * @param {request} req 
 * @param {response} res 
 * @returns json
 */
const getAniosVentas=async(req,res=response)=>{
    try {
        let cmd='select anio from  gveterinaria.ventas group by anio;';
        const years= await pool.query(cmd);
        if(years.length===0){
            return res.status(StatusCodes.CONFLICT)
            .json({
                OK:false,
                statusCode:StatusCodes.CONFLICT,
                statusDescription:'Error al generar años',
                errors:[
                    {
                        msg:"Error al generar años",
                        param:''
                    }
                ]
            });
        }
        return res.status(StatusCodes.OK)
        .json({
            OK:false,
            statusCode:StatusCodes.OK,
            statusDescription:'Información años generada',
            anios:years
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            OK:false,
            statusCode:StatusCodes.INTERNAL_SERVER_ERROR,
            statusDescription:'Error al generar años',
            errors:[
                {
                    msg:"Error al generar años",
                    param:''
                }
            ]
        });
    }
}

module.exports={getAllSales,getAniosVentas}