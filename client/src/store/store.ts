import {IUser} from "../models/IUser"
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
//import {AuthResponse} from "../models/response/AuthResponse";
//import axios from "axios";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    //isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    // setLoading(bool: boolean) {
    //     this.isLoading = bool;
    // }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            sessionStorage.setItem('token', response.data.token)
            //localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (error) {
            // @ts-ignore
            console.log(error.response?.data?.message)

        }
    }
    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            //localStorage.setItem('token', response.data.token);
            sessionStorage.setItem('token', response.data.token)
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (error) {
            // @ts-ignore
            console.log(error.response?.data?.message)

        }

    }

    async logout() {
        try {
            await AuthService.logout();
            //localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser)
        } catch (error) {
            // @ts-ignore
            console.log(error.response?.data?.message)

        }
    }


    // async checkAuth() {
    //     this.setLoading(true);
    //     try {
    //         const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
    //         console.log(response);
    //         sessionStorage.setItem('token', response.data.token);
    //         this.setAuth(true);
    //         this.setUser(response.data.user);
    //     } catch (error) {
    //         // @ts-ignore
    //         console.log(error.response?.data?.message);
    //     } finally {
    //         this.setLoading(false);
    //     }
    // }
}
