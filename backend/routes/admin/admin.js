import express from 'express';
import { adminAuthController } from '../../controllers/authController.js';

const router = express.Router();

router.post('/register', adminAuthController.register);
router.post('/login', adminAuthController.login);
export default router;