import { Document,model,Schema } from "mongoose";

export interface IProducts extends Document{
    name:string;
    price:string;
    category:string;
    rating:number;
    productImage:string;
}