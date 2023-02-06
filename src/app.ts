import express, { Application, NextFunction,Request,Response } from "express";
import morgan from "morgan";
import cors from "cors"
import { AppError, HttpCode } from "../utils/App.Error";
// import { errorHandler } from "../middlewares/errorHandler";
import {errorHandler} from "../middlewares/error/errorHandler"
import userRouter from "../routes/user.router"
import productRouter from "../routes/user.router"

export const appConfig=(app:Application)=>{
    app.use(morgan("dev")).use(express.json()).use(cors()).use('/api/auth',userRouter)

        .use("/api/user",userRouter)
        .use("/api/product",productRouter)
    // CATCH WRONG ROUTES
    app.all("*",(req:Request,res:Response,next:NextFunction)=>{
        next(
            new AppError({
                message:`This Route ${req.originalUrl} doesn't exists `,
                httpCode:HttpCode.NOT_FOUND
            })
        )

    })


    // ERROR MIDDLEWARES
    app.use(errorHandler)
}