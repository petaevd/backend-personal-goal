import UserModel from '../models/User.js';
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const register = async (req, res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array());
        }

        const { userName, login, password, role } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = await UserModel.create({
            userName,
            login,
            passwordHash: hash,
            role: role || 'USER'
        });

        const token = jwt.sign(
            {
                id: newUser.id,
                role: newUser.role
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...userData } = newUser.dataValues;

        res.json({
            ...userData,
            token,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось зарегистрироваться"
        });
    }
}

export const login = async (req, res) =>{
    try {
        //Проверяем есть ли пользователь в бд с введенным логином
        const user = await UserModel.findOne({ where: { login: req.body.login } });

        if(!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }

        //Проверяем совпадают ли пароли пользователя
        const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);

        if(!isValidPass){
            return res.status(400).json({
               message: 'Неверный логин или пароль'
            });
        }

        //Генерируем токен
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '30d',
            }
        );

        //Вытаскиваем пароль из данных
        const { passwordHash, ...userData } = user.dataValues;

        //Возвращаем данные пользователя и токен
        res.json({
            ...userData,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось авторизоваться"
        });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findOne({ where: { id: req.userId } });

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const { passwordHash, ...userData } = user.dataValues;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
};