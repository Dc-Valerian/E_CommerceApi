import { Request, Response, NextFunction } from "express";
import { authRole } from "../../constants/user.constant";
import { IAuthUser, IUser } from "../../interfaces/User";
import { AppError, HttpCode } from "../../utils/App.Error"

export const isAdmin = (
  req: Request<{}, {}, IAuthUser>,
  res: Response,
  next: NextFunction
) => {
  const user = req!.user as IUser;

  const adminUser = user && user.role === authRole.admin;
  if (!adminUser) {
    next(
      new AppError({
        message: "Unauthorized admin user",
        httpCode: HttpCode.UNAUTHORIZED,
      })
    );
  }

  next();
};

// const myID = (Math.random() * 10).toString(16);
// console.log(myID);
