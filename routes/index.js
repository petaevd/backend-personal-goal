import { Router } from "express";
import userRouter from './userRouter.js';
import goalRouter from "./goalRouter.js";

const router = new Router();

router.use('/user', userRouter);
router.use( goalRouter );

export default router;