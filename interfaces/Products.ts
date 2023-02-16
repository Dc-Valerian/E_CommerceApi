import { Document, Schema } from "mongoose";
import { IUser } from "./User";

export interface ReviewT {
  user: Schema.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}

export interface IProducts extends Document {
  name: string;
  price: number;
  category: string;
  ratings: number;
  productImage: string;
  numberOfReviews: number;
  reviews: ReviewT[];
}


export interface AddProducttoCart extends IUser{
  productId:string;
}