import { Router } from "express";
import { RegisterValidation,LoginValidation } from "../middlewares/Validation/authValidation/userValidation";
import {Login,Register} from "../controllers/user.controller"

const router =Router()

router.route("/register").post(RegisterValidation,Register)
router.route("/login").post(LoginValidation,Login)

export default router;