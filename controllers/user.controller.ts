import { Request, Response, NextFunction } from "express";
import UserModel from "./../models/user.model";
import { asyncHandler } from "../utils/asyncHandler"
import { IUser } from "../interfaces/User";
import bcrypt from "bcrypt";
import { AppError, HttpCode } from "../utils/App.Error"
import { generateToken } from "../middlewares/authorization/user.auth";

export const register = asyncHandler(
  async (
    req: Request<{}, {}, IUser>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { name, email, password, confirmPassword, role } = req.body;

    const salt: string = await bcrypt.genSalt(12);
    const hashPassword: string = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
      confirmPassword: hashPassword,
      role,
    });
    if (!user)
      next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          message: "User not created",
        })
      );
    return res.status(HttpCode.CREATED).json({
      data: { user },
    });
  }
);

export const login = asyncHandler(
  async (
    req: Request<{}, {}, IUser>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password) {
      next(
        new AppError({
          message: "Please provide email and password",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }

    const user = await UserModel.findOne({ email });
    const checkPassword = await bcrypt.compare(password, user!.password);

    if (!checkPassword) {
      next(
        new AppError({
          message: "Invalid password or email",
          httpCode: HttpCode.UNAUTHORIZED,
        })
      );
    }

    const token = generateToken({ email: user!.email, _id: user!._id });
    return res.status(HttpCode.OK).json({
      message: `${user!.name}, you are welcome`,
      token,
    });
  }
);

export const getUser = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const user = await UserModel.find();
    return res.status(HttpCode.OK).json({
      data: user,
    });
  }
);
