import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING,
        unique: true
    },
    passwordHash: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'USER'
    }
});

export default User;
