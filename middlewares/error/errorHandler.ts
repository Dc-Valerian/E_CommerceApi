import {Response,Request,NextFunction} from "express"
import { AppError } from "../../utils/App.Error"

const devError = (err:AppError,res:Response)=>{
    return res.status(err.httpCode).json({
        httpCode:err.httpCode,
        error:err,
        messgae:err.message,
        stack:err.stack
    })
}

export const errorHandler =(err:AppError,req:Request,res:Response,next:NextFunction)=>{
    devError(err,res);
}