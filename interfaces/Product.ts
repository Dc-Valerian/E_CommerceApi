import { Document,model,Schema } from "mongoose";

export interface ReviewT{
        user:Schema.Types.ObjectId,
        name:string;
        rating:number;
        comment:string;
}

export interface IProducts extends Document{
    name:string;
    price:string;
    category:string;
    ratings:number;
    productImage:string;
    numberOfReviews:number;
    reviews:ReviewT[]
}

