import { Request, Response, NextFunction } from "express";
import ProductModel from "../models/products.model";
import { IProducts } from "../interfaces/Products";
import { AppError, HttpCode } from "../utils/App.Error";
import { asyncHandler } from "../utils/asyncHandler";

export const createProduct = asyncHandler(
  async (
    req: Request<{}, {}, IProducts>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { name, productImage, price, category } = req.body;

    const product = await ProductModel.create({
      name,
      productImage,
      price,
      category,
    });
    if (!product)
      next(
        new AppError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          message: "Product not created",
        })
      );
    return res.status(201).json({
      data: { product },
    });
  }
);

export const getAllProduct = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const product = await ProductModel.find();
    if (!product)
      next(
        new AppError({
          message: "Product not found",
          httpCode: HttpCode.NOT_FOUND,
        })
      );

    return res.status(HttpCode.OK).json({
      data: { product },
    });
  }
);

export const addToCart