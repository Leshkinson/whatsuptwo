import dotenv from "dotenv";
import passport, {Strategy} from "passport";
import {googleConfigService} from "../config/config.service";
import GoogleStrategy, {VerifyCallback} from "passport-google-oauth20";
import {UserRepository} from "../repositories/user-repository";

dotenv.config();

const googleStrategy: Strategy = new GoogleStrategy.Strategy(googleConfigService.getGoogleStrategyConfig(),
    async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void> => {

        try {
            const userRepository = new UserRepository()
            const applicant = await userRepository.findByEmail(profile.emails[0].value);
            if (applicant) {
                return done(null, applicant);
            }
            //TODO change to user service
            const newUser = await userRepository.createUser({
                nickName: "",
                email: profile.emails[0].value,
                password: null,
                activationLink: null,
                isActivated: true
            })
            // const newUser = new User({
            //     method:'google',
            //     google: {
            //         id: profile.id,
            //         name: profile.displayName,
            //         email: profile.emails[0].value
            //     }
            // })
            //await newUser.save();
            return done(null, newUser)
        } catch (error: any) {
            return done(error, false)
        }
    });



passport.use(googleStrategy);

passport.serializeUser((user: Express.User, done) => {
    done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
});





