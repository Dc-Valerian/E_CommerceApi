import { Request,Response,NextFunction } from "express";
import { IAuthUser } from "../../interfaces/User";

export const isAdmin = async(req:IAuthUser,res:Response,next:NextFunction)=>{
    const user = req!.user

    if(user.role === "admin"){
        
    }
}