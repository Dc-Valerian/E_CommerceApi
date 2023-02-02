import jwt,{JwtPayload,Secret} from "jsonwebtoken"
import {Request,Response,NextFunction} from "express"
import { AppError, HttpCode } from "../../utils/App.Error";


 interface Payload extends JwtPayload{
            _id:string,
            email:string
        }

 const secret ="byvktuctxydufuvuy,dxkkyrysasdkrfghu.iyjraehsdrtfygiuhoijpoi,mncxbdgfcnghvhjbkjnnbwestrdyuioouytrstdtyfgiuoihopj.bzxfc";

export const generateToken = (user:Payload)=>{
    return jwt.sign(user,secret as Secret,{expiresIn:"1h"})
}

// verify and authorize the user

export const userAuth =(req:Request,res:Response,next:NextFunction)=>{
    // MAKING REQUEST FOR OUR TOKEN FRO THE HEADERS

   const headers=  req.headers.authorization;
   if(!headers || headers.startsWith("Bearer ")){
    next(
        new AppError({
            httpCode:HttpCode.UNAUTHORIZED,
            message:"you are not authorized"
        })
    )
   }
   

}