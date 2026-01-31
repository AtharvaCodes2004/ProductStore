import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../Controller/productController.js"

const router = express.Router()

router.get("/", getAllProducts)
router.post("/", createProduct)
router.get("/:id", getProduct)
router.delete("/:id", deleteProduct)
router.get("/:id", getProduct)
router.put("/:id", updateProduct)

export default router 