import express from "express";
import { authenticateUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'
import protectKarakum from "../middleware/authMware.js"; 

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authenticateUser);
router.route('/profile')
    .get(protectKarakum, getUserProfile)
    .put(protectKarakum, updateUserProfile)

export default router;