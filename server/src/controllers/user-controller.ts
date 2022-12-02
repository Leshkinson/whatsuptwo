import {Request, Response} from "express";
import {UserService} from "../services/user-service";
import dotenv from 'dotenv';
dotenv.config();

export class UserController {
    static async registration(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.registration(email, password);
            res.cookie('token', userData, {maxAge: 30 * 60 * 1000, httpOnly: true});

            return res.status(201).json(userData)

        } catch (error: any) {
            console.log(error.message)

            return res.status(404).json('Email is busy')
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            const token = await UserService.login(email, password);
            res.cookie('token', token, {maxAge: 30 * 60 * 1000, httpOnly: true});

            return res.sendStatus(201);

        } catch (error: any) {
            console.log(error.message)

            return res.status(404).json('Login incorrect')
        }
    }

    static async logout(req: Request, res: Response) {
        try {
            const { token } = req.cookies;
            const tokeN = await UserService.logout(token);
            res.clearCookie('token');

            return res.json(tokeN);

        } catch (error: any) {
            console.log(error.message)
        }
    }

    static async activated(req: Request, res: Response) {
        try {
            const activationLink = req.params.link;
            await UserService.activated(activationLink);
            // @ts-ignore
            return res.redirect(process.env.CLIENT_URL)
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