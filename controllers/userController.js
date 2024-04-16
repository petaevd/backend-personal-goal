import UserModel from '../models/User.js';
import {validationResult} from "express-validator";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array());
        }

        const { userName, login, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await UserModel.create({
            userName,
            login,
            password: hashPassword
        });

        const token = jwt.sign(
            {
                id: newUser.id
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '30d',
            }
        );

        res.json({
            ...newUser.dataValues,
            token
        });
    }
    catch (error) {
        console.error("Ошибка при создании пользователя:", error);
        res.status(500).json({ message: "Не удалось зарегистрироваться" });
    }
}

export async function login(req, res, next){
    console.log(req.body);
    return res.json({"login": "OK"});
}
