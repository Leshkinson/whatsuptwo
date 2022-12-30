import passport from "passport";
import {Router, Request, Response} from "express";
import {ValidationEmail} from "../validator/validator";
import {UserController} from "../controllers/user-controller";
import {isErrorMiddleware} from "../middleware/error-handler";

require('../services/google-auth-servise');

export const router = Router();

router.post('/api/registration', ValidationEmail, isErrorMiddleware, UserController.registration);
router.post('/api/login', ValidationEmail, isErrorMiddleware, UserController.login);
router.post('/api/logout', ValidationEmail, isErrorMiddleware, UserController.logout);

router.get('/api/activated/:link', UserController.activated);
router.get('/api/users', UserController.getUsers);
router.get('/api/test', (req: Request, res: Response) => {
    res.end('Logged in!!!!')
});

router.get('/api/google', passport.authenticate('google', {scope: ['email', 'profile']}));
router.get('/google/callback', passport.authenticate('google', { session: false,
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed", } ), (req, res) => {
    //res.redirect("/api/socket");
});
//router.get('/google/callback', passport.authorize('google', {failureRedirect: '/test'}), UserController.loginByGoogle);

router.get('/api/socket',(req, res) => {
    res.sendFile('/home/neatsoft/WebstormProjects/WhatsUp_2.0/server/src/router/index.html');
});








