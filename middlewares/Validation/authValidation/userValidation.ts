import { NextFunction, RequestHandler,Request,Response } from "express";
import { userSchemaValidator } from "./userSchema";
import {validator} from "../validator";

export const RegisterValidation :RequestHandler=(
    req:Request,res:Response,next:NextFunction
)=>{
    validator(userSchemaValidator.register,req.body,next)
};

export const LoginValidation:RequestHandler=(
    req:Request,res:Response,next:NextFunction
)=>{
    validator(userSchemaValidator.login,req.body,next)
}