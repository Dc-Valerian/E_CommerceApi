import { Request,Response,NextFunction } from "express";
import { IAuthUser } from "../../interfaces/User";
import { AppError, HttpCode } from "../../utils/App.Error";

export const isAdmin = (req:IAuthUser,res:Response,next:NextFunction)=>{
    const user = req!.user

    const adminUser = user && user.role === "admin"

    if(!adminUser){
        next(
            new AppError({
                message:"Unauthorized admin user",
                httpCode:HttpCode.UNAUTHORIZED
            })
        )
    }

    next()
}