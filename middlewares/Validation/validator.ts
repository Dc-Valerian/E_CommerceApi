import { NextFunction } from "express"
import {AppError,HttpCode} from "../../utils/App.Error"

import Joi from "joi"
export  const validator = (schemaName:Joi.ObjectSchema,body:Object,next:NextFunction)=>{
    const value = schemaName.validate(body,{
        allowUnknown:true,
        abortEarly:false,
        stripUnknown:true,
    })
    try {
        value.error ?next(
            new AppError({
                httpCode:HttpCode.UNPROCESSABLE_IDENTITY,
                message:value.error.details[0].message,
            })
        )
        :next();
    } catch (error) {
        next(
            new AppError({
                 httpCode:HttpCode.BAD_REQUEST,
                message:error,
            })
        )
    }
}