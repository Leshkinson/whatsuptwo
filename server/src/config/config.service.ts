import dotenv from "dotenv";
import {UserEntity} from "../entity/user.entity";
import {TokenEntity} from "../entity/token.entity";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
dotenv.config();

class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) {
    }

    SECURE_MAILER_PORT = 465;

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return <string>value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue("PORT", true);
    }

    public isProduction() {
        return this.getValue("MODE", false) === "production";
    }

    public getTypeOrmConfig(): PostgresConnectionOptions {
        return {
            type: "postgres",

            host: this.getValue("POSTGRES_HOST"),
            port: parseInt(this.getValue("POSTGRES_PORT")),
            username: this.getValue("POSTGRES_USER"),
            password: this.getValue("POSTGRES_PASSWORD"),
            database: this.getValue("POSTGRES_DATABASE"),

            entities: this.getEntitiesArray(),

            migrationsTableName: "migration",

            migrations: ["src/migration/*.ts"],

            migrationsRun: true,
            synchronize: true,

            ssl: this.isProduction()
        };
    }

    public getEntitiesArray() {
        return [
            UserEntity,
            TokenEntity,
        ];
    }

    public getAuthConfig() {
        return {
            secret: this.getValue("JWT_ACCESS_SECRET"),
            signOptions: {
                expiresIn: `${parseInt(this.getValue("TOKEN_LIVE_TIME"))}s`
            }
        };
    }


    public getMailerConfig() {
        return {
            host: this.getValue("SMTP_HOST"),
            port: Number(this.getValue("SMTP_PORT")),
            secure: this.isSecureMailerConnection(),
            auth: {
                user: this.getValue("EMAIL_ADDRESS"),
                pass: this.getValue("EMAIL_PASSWORD")
            }
        }
    }

    public isSecureMailerConnection() {
        return Number(this.getValue("SMTP_PORT")) === this.SECURE_MAILER_PORT;
    }

    public getMailerOwner() {
        return {
            from: `Mailer Test <${process.env.EMAIL_ADDRESS}>`
        }
    }
}

const databaseConfigService = new ConfigService(process.env)
    .ensureValues([
        "POSTGRES_HOST",
        "POSTGRES_PORT",
        "POSTGRES_USER",
        "POSTGRES_PASSWORD",
        "POSTGRES_DB"
    ]);

const authConfigService = new ConfigService(process.env)
    .ensureValues([
        "JWT_ACCESS_SECRET",
        "TOKEN_LIVE_TIME"
    ]);

const mailerConfigService = new ConfigService(process.env)
    .ensureValues([
        "SMTP_HOST",
        "SMTP_PORT",
        "EMAIL_ADDRESS",
        "EMAIL_PASSWORD",
    ]);

export {
    databaseConfigService,
    authConfigService,
    mailerConfigService,
};