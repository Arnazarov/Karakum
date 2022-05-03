import express from "express";
import { authenticateUser, deleteUser, getAllUsers, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'
import { protectKarakum, isAdmin }from "../middleware/authMware.js"; 

const router = express.Router();

router.route('/')
    .post(registerUser)
    .get(protectKarakum, isAdmin, getAllUsers);
router.post('/login', authenticateUser);
router.route('/profile')
    .get(protectKarakum, getUserProfile)
    .put(protectKarakum, updateUserProfile)
router.route('/:id').delete(protectKarakum, isAdmin, deleteUser)

export default router;