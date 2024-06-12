import { body } from 'express-validator';

export const registerValidation = [
    body('userName', 'Имя должно быть минимум 2 символа').isLength({ min: 2 }),
    body('login', 'Логин должен быть минимум 6 символов').isLength({ min: 6 }),
    body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 })
];

export const loginValidation = [
    body('login', 'Логин должен быть минимум 6 символов').isLength({ min: 6 }),
    body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 })
];

// export const goalValidation = [
//     body('userName', 'Имя должно быть минимум 2 символа').isLength({ min: 2 }),
//     body('login', 'Логин должен быть минимум 6 символов').isLength({ min: 6 }),
//     body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 })
// ];