import jwt,{JwtPayload,Secret, verify, VerifyErrors} from "jsonwebtoken"
import {Request,Response,NextFunction} from "express"
import { AppError, HttpCode } from "../../utils/App.Error";
import UserModel from "../../models/User.model";
import { IUser } from "../../interfaces/User";


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
   const token:string = headers!.split(" ")[1]

//    verify the token payload
jwt.verify(
    token,secret as Secret, async(err:VerifyErrors| null,decodedUser:any)=>{
        if(err){
            const errorMsg =
            err.name === "JsonWebTokenError"? "Invalid token, you are not unauthorized":err.message;
            next(
                new AppError({
                    httpCode:HttpCode.UNAUTHORIZED,
                    message:errorMsg,
                })
            )
        }
        try {
            const verifiedUser = await UserModel.findOne({_id:decodedUser!._id})
            if(!verifiedUser){
                next(
                    new AppError({
                        httpCode:HttpCode.UNAUTHORIZED,
                        message:"Unauthorized User",
                    })
                )
            }
            req!.user = verifiedUser as IUser;
            next();
        } catch (error) {
            next(
                new AppError({
                    httpCode:HttpCode.INTERNAL_SERVER_ERROR,
                    message:error,
                })
            )
        }
    }
)


}