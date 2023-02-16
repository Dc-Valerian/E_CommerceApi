import express, { Application } from "express"
// import { dbConnection } from "../config/DB";
import { dbConfig } from "../config/DB";
// import { envVariable } from "../config/environment Variables";
import { envVariables } from "../config/environmentVariables";
import { appConfig } from "./app";



const port = envVariables.PORT


const app:Application = express();

appConfig(app)
// dbConnection()
dbConfig()

app.listen(port,()=>{
    console.log(`Listening to LocalHost PORT:${port}`);
})