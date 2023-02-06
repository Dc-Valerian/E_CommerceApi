import { Document,Schema } from "mongoose";


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