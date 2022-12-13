import dotenv from "dotenv";
import passport, {Strategy} from "passport";
import {googleConfigService} from "../config/config.service";
import GoogleStrategy, {VerifyCallback} from "passport-google-oauth20";

dotenv.config();

passport.serializeUser((user: Express.User, done) => {
    done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
});

const googleStrategy: Strategy = new GoogleStrategy.Strategy(googleConfigService.getGoogleStrategyConfig(),
    (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): string => {
        done(null, profile);
        return profile.emails[0].value;
    });

passport.use(googleStrategy);





