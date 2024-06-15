import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import User from "./User.js"; // Ensure correct import

const Goal = sequelize.define('Goal', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    tags: {
        type: DataTypes.STRING
    },
    startDate: {
        type: DataTypes.STRING
    },
    endDate: {
        type: DataTypes.STRING
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        allowNull: false
    }
});

Goal.belongsTo(User);
User.hasMany(Goal);

export default Goal;
