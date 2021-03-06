import express from "express";
import {createOrder, getAllOrders, getMyOrders, getOrderById,  updateOrderWithDelivery,  updateOrderWithPay} from '../controllers/orderController.js'
import { isAdmin, protectKarakum } from '../middleware/authMware.js'
const router = express.Router();

router.route('/')
    .post(protectKarakum, createOrder)
    .get(protectKarakum, isAdmin, getAllOrders);
router.route('/myorders').get(protectKarakum, getMyOrders);
router.route('/:id').get(protectKarakum, getOrderById);
router.route('/:id/pay').put(protectKarakum, updateOrderWithPay);
router.route('/:id/deliver').put(protectKarakum, isAdmin, updateOrderWithDelivery);

export default router;


