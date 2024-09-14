import { Router } from "express";
import userRouter from './userRouter.js';
import goalRouter from "./goalRouter.js";
import adminRouter from "./adminRouter.js";

const router = new Router();

router.use( '/user', userRouter );
router.use( goalRouter );
router.use( '/admin', adminRouter );

export default router;