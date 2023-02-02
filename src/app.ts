import express, { Application, NextFunction,Request,Response } from "express";
import morgan from "morgan";
import cors from "cors"
import { AppError, HttpCode } from "../utils/App.Error";
// import { errorHandler } from "../middlewares/errorHandler";
import {errorHandler} from "../middlewares/error/errorHandler"
import router from "../routes/user.router"

export const appConfig=(app:Application)=>{
    app.use(morgan("dev")).use(express.json()).use(cors())

    // CATCH WRONG ROUTES
    app.all("*",(req:Request,res:Response,next:NextFunction)=>{
        next(
            new AppError({
                message:`This Route ${req.originalUrl} does not exist `,
                httpCode:HttpCode.NOT_FOUND
            })
        )

    })

    .use("./api/user",router)
    // ERROR MIDDLEWARES
    app.use(errorHandler)
}