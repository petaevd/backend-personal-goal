import { Router } from "express";
import { register, login } from "../controllers/userController.js";
import { registerValidation } from "../validations/auth.js";

const router = new Router();

router.post('/register',registerValidation, register);
router.post('/login', login);

export default router;