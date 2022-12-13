import {Request} from "express";
import {Profile} from "passport-google-oauth20";

export interface CreateTokenDto {
    token: string;
    userId: number
}

export interface GoogleRequest extends Request {
    account: Profile
}
