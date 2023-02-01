import express, { Application } from "express"
import { dbConnection } from "../config/DB";
import { envVariable } from "../config/environment Variables";
import { appConfig } from "./app";



const port = envVariable.PORT


const app:Application = express();

appConfig(app)
dbConnection()

app.listen(port,()=>{
    console.log(`Listening to LocalHost PORT:${port}`);
})