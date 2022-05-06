import express from "express";
import { createProduct, createReview, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js'
import { protectKarakum, isAdmin }from "../middleware/authMware.js"; 
 
const router = express.Router();

router.route('/')
    .get(getAllProducts)
    .post(protectKarakum, isAdmin, createProduct)
router.route('/:id')
    .get(getProductById)
    .delete(protectKarakum, isAdmin, deleteProduct)
    .put(protectKarakum, isAdmin, updateProduct)
router.route('/:id/reviews')
    .post(protectKarakum, createReview);
export default router;