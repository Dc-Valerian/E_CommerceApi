import { RequestHandler } from "express";
import { validator } from "./../validator";
import { userSchemaValidator } from "./userSchema";

export const registerValidation: RequestHandler = (req, res, next) =>
  validator(userSchemaValidator.register, req.body, next);

export const loginValidation: RequestHandler = (req, res, next) =>
  validator(userSchemaValidator.login, req.body, next);
