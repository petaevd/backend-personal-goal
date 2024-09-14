import UserModel from "../models/User.js";

// Получить всех пользователей
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить список пользователей."
        });
    }
}

// Обновить пользователя
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Получаем ID пользователя из параметров запроса
        const updatedUser = await UserModel.update(req.body, { where: { id } });

        if (updatedUser[0] === 0) {
            return res.status(404).json({
                message: "Пользователь не найден."
            });
        }

        res.json({
            message: "Пользователь успешно обновлен."
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось обновить пользователя."
        });
    }
}

// Удалить пользователя
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Получаем ID пользователя из параметров запроса
        const deletedUser = await UserModel.destroy({ where: { id } });

        if (!deletedUser) {
            return res.status(404).json({
                message: "Пользователь не найден."
            });
        }

        res.json({
            message: "Пользователь успешно удален."
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось удалить пользователя."
        });
    }
}
