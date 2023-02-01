import express, { Application } from "express"
import { envVariable } from "../config/environment Variables";
import { appConfig } from "./app";



const port = envVariable.PORT


const app:Application = express();

appConfig(app)

app.listen(port,()=>{
    console.log(`Listening to LocalHost PORT:${port}`);
})