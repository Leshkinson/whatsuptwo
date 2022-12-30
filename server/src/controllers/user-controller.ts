import dotenv from "dotenv";
import {Request, Response} from "express";
import {GoogleRequest} from "../dto/token-dto";
import {UserService} from "../services/user-service";
import {clientConfigService} from "../config/config.service";

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
            //res.clearCookie('token');
            res.cookie('token', token, {maxAge: 30 * 60 * 1000, httpOnly: true});

            return res.status(201)
                .redirect(clientConfigService.getClientUrl());

        } catch (error: any) {
            console.log(error.message);

            return res.status(404).json('Login incorrect');
        }
    }

    static async logout(req: Request, res: Response) {
        try {
            const {token} = req.cookies;
            //const deleteToken = await UserService.logout(token);
            await UserService.logout(token);
            res.clearCookie('token');

            return res.redirect('/api/login');

        } catch (error: any) {
            console.log(error.message);
        }
    }

    static async activated(req: Request, res: Response) {
        try {
            const activationLink = req.params.link;
            const userService = new UserService();

            await userService.activated(activationLink);

            return res.redirect(clientConfigService.getClientUrl());
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

    static async registrationByGoogle (req: Request, res: Response) {
        try {
            const request = req as GoogleRequest;

            const { email } = request.account._json;
            if (email) {
                const userService = new UserService();
                const userData = await userService.registrationByGoogle(email);
                res.cookie('token', userData.token, {maxAge: 30 * 60 * 1000, httpOnly: true});

                return res.status(204)
                    // .redirect(clientConfigService.getClientUrl());
            }
        } catch (error: any) {
            console.log(error.message)

            return res.status(404).json('Email is busy');
        }
    }

    static async loginByGoogle (req: Request, res: Response) {
        try {
            const request = req as GoogleRequest;

            const { email } = request.account._json;
            if (email) {
                const userService = new UserService();
                const token = await userService.loginByGoogle(email);

                return res
                    .cookie('token', token, {maxAge: 30 * 60 * 1000, httpOnly: true})
                    .sendStatus(201);
            }
        } catch (error: any) {
            console.log(error.message);

            return res.status(404).json('Login incorrect');
        }
    }
}

