import mongoose from "mongoose"
import { envVariable } from "./environment Variables"

const DB = envVariable.DB_STRING;
export async function dbConnection(){
    try {
        const conn = await mongoose.connect(DB)
        console.log(`Database is connected to ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}