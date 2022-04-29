import express from "express";
import { authenticateUser, getUserProfile, registerUser } from '../controllers/userController.js'
import protectKarakum from "../middleware/authMware.js"; 

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authenticateUser);
router.route('/profile').get(protectKarakum, getUserProfile)

export default router;