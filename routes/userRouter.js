import { Router } from "express";
import { UserController } from '../controllers/index.js';
import { registerValidation } from "../validations/auth.js";
import checkAuth from '../utils/checkAuth.js';

const router = new Router();

router.post('/register', registerValidation, UserController.register);
router.post('/login', UserController.login);
router.get('/me', checkAuth, UserController.getMe);

export default router;