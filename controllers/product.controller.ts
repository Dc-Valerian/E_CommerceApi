import {Request,Response,NextFunction} from "express"
import ProducSchema from "../models/product.model"
import { IProducts } from "../interfaces/Product"
import {AppError,HttpCode} from "../utils/App.Error"
import { asyncHandler } from "../utils/asyncHandler"

export const createProduct = asyncHandler(
    async(req:Request<{},{},IProducts>,res:Response,next:NextFunction):Promise<Response>=>{
        const {name,productImage,price,category} = req.body

        const product = await ProducSchema.create({
            name,productImage,price,category
        })
  
        if(!product)next(new AppError({
            message:`couldn't create product`,
            httpCode:HttpCode.BAD_REQUEST
        }))
        return res.status(HttpCode.CREATED).json({
            data:product
        })
    }
)
export const getAllProduct = asyncHandler(
    async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{
        const product = await ProducSchema.find()
        if(!product)next(new AppError({
            message:"Product not Found",
            httpCode:HttpCode.NOT_FOUND
        }))
        return res.status(HttpCode.OK).json({
            data:product
        })
    }
)