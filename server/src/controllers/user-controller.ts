import {Request, Response} from "express";
import {UserService} from "../services/user-service";

export class UserController {
    static async registration(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.registration(email, password)
            console.log('userData',userData)
            res.cookie('token', userData, {maxAge: 30 * 60 * 1000, httpOnly: true})
            return res.status(201).json(userData)

        } catch (error: any) {
            console.log(error.message)

        }
    }

    // static async login(req: Request, res: Response) {
    //     try {
    //
    //     } catch (error: any) {
    //         console.log(error.message)
    //
    //     }
    // }
    //
    // static async logout(req: Request, res: Response) {
    //     try {
    //
    //     } catch (error: any) {
    //         console.log(error.message)
    //
    //     }
    // }
    //
    // static async activated(req: Request, res: Response) {
    //     try {
    //
    //     } catch (error: any) {
    //         console.log(error.message)
    //
    //     }
    // }
    //
    // static async getUsers(req: Request, res: Response) {
    //     try {
    //         res.status(200).send('Hi Everyone!')
    //     } catch (error: any) {
    //         console.log(error.message)
    //
    //     }
    // }
}