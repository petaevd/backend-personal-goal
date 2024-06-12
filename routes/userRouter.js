import { Router } from "express";
import { UserController } from '../controllers/index.js';
import { registerValidation, loginValidation } from "../validations.js";
import checkAuth from '../utils/checkAuth.js';

const router = new Router();

router.post('/register', registerValidation, UserController.register);
router.post('/login', loginValidation, UserController.login);
router.get('/me', checkAuth, UserController.getMe);

export default router;