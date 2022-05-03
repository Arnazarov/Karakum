import express from "express";
import {createOrder, getOrderById,  updateOrderWithPay} from '../controllers/orderController.js'
import protectKarakum from '../middleware/authMware.js'
const router = express.Router();

router.route('/').post(protectKarakum, createOrder);
router.route('/:id').get(protectKarakum, getOrderById);
router.route('/:id/pay').put(protectKarakum, updateOrderWithPay);

export default router;


