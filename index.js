import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
import {configDotenv} from "dotenv";
import router from "./routes/index.js";

configDotenv();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

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