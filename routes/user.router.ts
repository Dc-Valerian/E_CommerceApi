import { Router } from "express";
import { RegisterValidation,LoginValidation } from "../middlewares/Validation/authValidation/userValidation";
import {Login,Register,getUser} from "../controllers/user.controller"

const router =Router()

router.route("/register").post(RegisterValidation,Register)
router.route("/register").post(RegisterValidation,Register)
router.route("/").get(getUser)

export default router;