import jwt from 'jsonwebtoken';

const checkAdmin = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            // Расшифровываем токен
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            // Проверяем роль пользователя
            if (decoded.role !== 'ADMIN') {
                return res.status(403).json({
                    message: 'Доступ запрещен: недостаточно прав',
                });
            }

            req.userId = decoded.id; // Добавляем userId в запрос
            next(); // Передаем управление следующему middleware
        } catch (e) {
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа',
        });
    }
};

export default checkAdmin;
