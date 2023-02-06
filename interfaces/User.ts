import { Document,Schema } from "mongoose";
import { Request } from "express";

export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
    // userId:Schema.Types.ObjectId;
    // cart?:{
    //     items:{
    //         productId:Schema.Types.ObjectId;
    //         quantity:number
    //     }
    // }[];
    role:string;
}
export interface IAuthUser extends Request{
    user:IUser
}