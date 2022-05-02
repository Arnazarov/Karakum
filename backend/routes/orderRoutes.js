import express from "express";
import {createOrder} from '../controllers/orderController.js'
import protectKarakum from '../middleware/authMware.js'
const router = express.Router();

router.route('/').post(protectKarakum, createOrder);

export default router;


