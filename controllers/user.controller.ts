import bcrypt from "bcrypt"
import { Request,Response,NextFunction } from "express"
import {asyncHandler} from "../utils/asyncHandler"
import {IUser} from "../interfaces/User"
import userModel from "../models/User.model"
import { AppError, HttpCode } from "../utils/App.Error"
import jwt from "jsonwebtoken"

// TO REGISTER
export const Register = asyncHandler(
    async(req:Request<{},{},IUser>
        ,res:Response,next:NextFunction):Promise<Response>=>{
        const {name,email,password,confirmPassword} = req.body;

        const salt:string = await bcrypt.genSalt(10)
        const hashedPassword :string=await bcrypt.hash(password,salt);

        const user = await userModel.create({
            name,email,password:hashedPassword,confirmPassword :password,
        })

        if(!user){
            next(
                new AppError({
                    message:"Account not Found",
                    httpCode:HttpCode.BAD_REQUEST,
                })
            )
        }

       
        return res.status(HttpCode.CREATED).json({
       user
        })
    }
)


// TO LOGIN
export const Login = asyncHandler(
    async(req:Request<{},{},IUser>
        ,res:Response,next:NextFunction):Promise<Response>=>{
        const {email,password} = req.body;

        if(!email || !password){
            next(
                new AppError({
                    message:"Please Provide the valid email or password",
                    httpCode:HttpCode.BAD_REQUEST,
                })
            )
        }

        const user = await userModel.findOne({email})
        if(!user){
            next(
                new AppError({
                    message:"couldn't login user in ",
                    httpCode:HttpCode.FORBIDDEN,
                })
            )
        }
        const checkPass = await bcrypt.compare(password,user!.password)
        if(!user){
            next(
                new AppError({
                    message:"Couldn't Login",
                    httpCode:HttpCode.NOT_FOUND,
                })
            )
        }
         const payload ={
            id:user!._id,
            email:user!.email
        }
        const secret ="byvktuctxydufuvuy,dxkkyrysasdkrfghu.iyjraehsdrtfygiuhoijpoi,mncxbdgfcnghvhjbkjnnbwestrdyuioouytrstdtyfgiuoihopj.bzxfc"
        jwt.sign(payload,secret as jwt.Secret,{expiresIn:"1h"})
        return res.status(HttpCode.OK).json({
             message:`${user!.name},you are welcome`
        })
    }
)