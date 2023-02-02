import { Router } from "express";
import { RegisterValidation,LoginValidation } from "../middlewares/Validation/authValidation/userValidation";
import {Login,Register,getUser} from "../controllers/user.controller"
import { userAuth } from "../middlewares/authorization/user.auth";

const router =Router()

router.route("/register").post(RegisterValidation,Register)
router.route("/register").post(RegisterValidation,Register)
router.route("/").get(userAuth,getUser)

export default router;