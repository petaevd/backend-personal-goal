import { Router } from "express";
import { AdminController } from '../controllers/index.js';
import checkAuth from "../utils/checkAuth.js";
import checkAdmin from "../utils/checkAdmin.js";

const router = new Router();
// Сделать апи для админ панели (удалить, редактировать пользователя)
// Сделать страницу админ панель(доступную только админам)
router.get('/getAllUsers', checkAuth, checkAdmin, AdminController.getAllUsers);
router.delete('/deleteUser/:id', checkAuth, checkAdmin, AdminController.deleteUser);
router.put('/updateUser/:id', checkAuth, checkAdmin, AdminController.updateUser);

export default router;