import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors"

export const appConfig=(app:Application)=>{
    app.use(morgan("dev")).use(express.json()).use(cors())
}