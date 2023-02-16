import { Document, model, Schema } from "mongoose";
import { IProducts } from "../interfaces/Products";
import { category } from "../constants/product.constant";

interface ProductSchema extends Document, IProducts {}

const productSchema: Schema<ProductSchema> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
    productImage: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        category.all,
        category.books,
        category.electronics,
        category.mensWear,
        category.mobilePhone,
        category.womensWear,
      ],
      message: `Please enter category as supplied: ${category.all},${category.books},${category.electronics},${category.mensWear},${category.mobilePhone}, ${category.womensWear} `,
      default: category.all,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductModel = model<ProductSchema>("Product", productSchema);
export default ProductModel;
