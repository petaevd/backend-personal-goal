import { Router } from "express";
import { GoalController } from '../controllers/index.js';
import checkAuth from "../utils/checkAuth.js";

const router = new Router();

router.post('/goals', checkAuth, GoalController.createGoal);
router.get('/goals', checkAuth, GoalController.getGoalsUser);
router.delete('/goals/:id', checkAuth, GoalController.deleteGoal);
router.patch('/goals/:id', checkAuth, GoalController.updateGoal);
export default router;