import dotenv from "dotenv";
import {Request, Response} from "express";
import {UserService} from "../services/user-service";

dotenv.config();

export class UserController {
    static async registration(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            const userService = new UserService();
            const userData = await userService.registration(email, password);
            res.cookie('token', userData.token, {maxAge: 30 * 60 * 1000, httpOnly: true});

            return res.status(201).json(userData);

        } catch (error: any) {
            console.log(error.message);

            return res.status(404).json('Email is busy');
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body;

            const userService = new UserService();
            const token = await userService.login(email, password);

            return res
                .cookie('token', token, {maxAge: 30 * 60 * 1000, httpOnly: true})
                .sendStatus(201);

        } catch (error: any) {
            console.log(error.message);

            return res.status(404).json('Login incorrect');
        }
    }

    static async logout(req: Request, res: Response) {
        try {
            const {token} = req.cookies;
            const deleteToken = await UserService.logout(token);
            res.clearCookie('token');

            return res.json(deleteToken);

        } catch (error: any) {
            console.log(error.message);
        }
    }

    static async activated(req: Request, res: Response) {
        try {
            const activationLink = req.params.link;
            const userService = new UserService();

            await userService.activated(activationLink);
            // @ts-ignore
            return res.redirect(process.env.CLIENT_URL);
        } catch (error: any) {
            console.log(error.message)
        }
    }

    static async getUsers(req: Request, res: Response) {
        try {
            res.status(200).send('Hi Everyone!');
        } catch (error: any) {
            console.log(error.message)
        }
    }
}