import express from "express";
import { deleteProduct, getAllProducts, getProductById } from '../controllers/productController.js'
import { protectKarakum, isAdmin }from "../middleware/authMware.js"; 
 
const router = express.Router();

router.get('/', getAllProducts)
router.route('/:id')
    .get(getProductById)
    .delete(protectKarakum, isAdmin, deleteProduct)
export default router;