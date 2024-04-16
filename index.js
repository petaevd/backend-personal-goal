import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
import jwt from 'jsonwebtoken';
import {configDotenv} from "dotenv";
import router from "./routes/index.js";

configDotenv();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.get("/", (req, res) => {
    res.json({ message: "Welcome!" });
});

app.post('/auth/login', (req, res) => {
    console.log(req.body);

    const token = jwt.sign({
        login: req.body.login,
        fullName: 'Вася'
    }, process.env.SECRET_KEY);

    res.json({
       success: true,
       token
    });
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log('Server start on PORT: ' + PORT));
    }
    catch (e) {
        console.log(e);
    }
}

start();