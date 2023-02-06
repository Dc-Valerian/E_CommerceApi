import {Router} from"express"
import {getAllProduct,createProduct} from "../controllers/product.controller"

const router = Router()

router.route("/getallproduct").get(getAllProduct)
router.route("/create").post(createProduct)

export default router