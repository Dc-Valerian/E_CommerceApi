import { Router } from "express";
import {
  createProduct,
  getAllProduct,
} from "../controllers/product.controller";
import { userAuth } from "../middlewares/authorization/user.auth";

const router = Router();

router.route("/").get(userAuth, getAllProduct);
router.route("/create").post(createProduct);

export default router;
