import GoalModel from "../models/Goal.js";

//Все цели пользователя
export const getGoalsUser = async (req, res) =>{
    try{
        const goals = await GoalModel.findAll({ where: { UserId: req.userId } });

        res.json(goals)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить цели"
        });
    }
}

//Создание цели
export const createGoal = async (req, res) =>{
    try{
        const { title, description, tags, startDate, endDate } = req.body;
        const userId = req.userId;

        const newGoal = await GoalModel.create({
            title,
            description,
            tags,
            startDate,
            endDate,
            UserId: userId
        });

        res.json(newGoal);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось создать цель"
        });
    }
}

// Обновляем
export const updateGoal = async (req, res) => {
    try {
        const goalId = req.params.id;
        const { title, description, tags, startDate, endDate } = req.body;

        const goal = await GoalModel.findByPk(goalId);

        if (!goal) {
            return res.status(404).json({ message: "Цель не найдена" });
        }

        await GoalModel.update(
            {
                title,
                description,
                tags,
                startDate,
                endDate,
            },
            {
                where: { id: goalId },
            }
        );

        const updatedGoal = await GoalModel.findByPk(goalId);

        res.json(updatedGoal);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Не удалось обновить цель" });
    }
};

//Удалить
export const deleteGoal = async (req, res) =>{
    try{
        const goalId = req.params.id;

        GoalModel.destroy({ where: { id: goalId }});

        res.json({
            message: "Статья удалена",
            success: true
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось удалить цель"
        });
    }
}
