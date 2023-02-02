import bcrypt from "bcrypt"
import { Request,Response,NextFunction } from "express"
import {asyncHandler} from "../utils/asyncHandler"
import {IUser} from "../interfaces/User"
import userModel from "../models/User.model"
import { AppError, HttpCode } from "../utils/App.Error"


export const Register = asyncHandler(
    async(req:Request<{},{},IUser>
        ,res:Response,next:NextFunction):Promise<Response>=>{
        const {name,email,password,confirmPassword} = req.body;

        const salt:string = await bcrypt.genSalt(10)
        const hashedPassword :string=await bcrypt.hash(password,salt);

        const user = await userModel.create({
            name,email,password:hashedPassword
        })

        if(!user){
            next(
                new AppError({
                    message:"Account not Found",
                    httpCode:HttpCode.NOT_FOUND,
                })
            )
        }

        return res.status(200).json({
            user
        })
    }
)



// export const Login = asyncHandler(
//     async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{
//         const {email,password} = req.body;

//         const user = await userModel.findOne({email})
//         if(!user){
//             next(
//                 new AppError({
//                     message:"couldn't login user in ",
//                     httpCode:HttpCode.FORBIDDEN,
//                 })
//             )
//         }
//         const checkPass = await bcrypt.compare(password,user!password)
//         if(!user)
//     }
// )