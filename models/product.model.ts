import { Document,model,Schema } from "mongoose";
import { IProducts } from "../interfaces/Product";

interface ProductSchema extends Document,IProducts{}

const productSchema:Schema<ProductSchema> = new Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        productImage:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        rating:{
             type:Number,
             default:0
        },
        numberOfReviews:{
             type:Number,
             default:0
        },
        reviews:[
            {
                user:{
                    type:Schema.Types.ObjectId,
                    ref:"User",
                    required:true,
                },
                name:{
                    type:String,
                    required:true,
                },
                rating:{
                    type:Number,
                    required:true,
                },
                comment:{
                    type:String,
                    required:true,
                },
            }
        ]
    }
},{timestamps:true,versionKey:true})

const ProducSchema = model<ProductSchema>("Product",productSchema)

export default ProducSchema;