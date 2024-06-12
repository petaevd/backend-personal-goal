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
        const { title, description, tags } = req.body;
        const userId = req.userId;

        const newGoal = await GoalModel.create({
            title,
            description,
            tags,
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

export const updateGoal = async (req, res) =>{
    try{

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось создать цель"
        });
    }
}

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
