import { Router } from "express";
import { RegisterValidation,LoginValidation } from "../middlewares/Validation/authValidation/userValidation";

const router =Router()

router.route("/register").post(RegisterValidation)
router.route("/login").post(LoginValidation)