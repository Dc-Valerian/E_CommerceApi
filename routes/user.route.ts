import { Router } from "express";
import { getUser, login, register } from "../controllers/user.controller";
import { isAdmin } from "../middlewares/authorization/admin.auth";
import { userAuth } from "../middlewares/authorization/user.auth";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/validation/authValidation/userValidation";
const router = Router();

router.route("/register").post(registerValidation, register);

router.route("/login").post(loginValidation, login);

router.route("/").get(userAuth, isAdmin, getUser);

export default router;
