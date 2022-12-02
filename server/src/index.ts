import express from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {router} from "./router/router";
import {DataSource} from "typeorm";
import {databaseConfigService} from "./config/config.service";

dotenv.config();

const app = express();
export const postgresDataBase = new DataSource(databaseConfigService.getTypeOrmConfig())

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());


postgresDataBase.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    }).catch((err) => {
    console.error("Error during Data Source initialization", err)
});

app.use('/', router);

const start = (): void => {
    const PORT = process.env.PORT || 3001
    try {
        app.listen(PORT, () => console.log(`Server has been started on http://localhost:${PORT}`));
    } catch (error: any) {
        console.log(error.message)
    }
}

start();