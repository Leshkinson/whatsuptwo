import {DataSource} from 'typeorm';
import dotenv from 'dotenv';
// import {TokenEntity} from "../entity/token.entity";
// import {UserEntity} from "../entity/user.entity";
import {databaseConfigService} from "./config.service"
dotenv.config();


export const postgresDataBase = new DataSource(databaseConfigService.getTypeOrmConfig())
//     {
//     type: "postgres",
//     host: process.env.POSTGRES_HOST,
//     port: +`${process.env.POSTGRES_PORT}`,
//     username: process.env.POSTGRES_USER,
//     password: `${process.env.POSTGRES_PASSWORD}`,
//     database: process.env.POSTGRES_DB,
//     entities: [UserEntity, TokenEntity],
//     logging: true,
//     synchronize: false,
//     migrations: ["migration/*.js"],
// }