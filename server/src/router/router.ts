import {Router, Request, Response} from "express";
import {ValidationEmail} from "../validator/validator";
import {UserController} from "../controllers/user-controller";
import {isErrorMiddleware} from "../middleware/error-handler";
import passport from "passport";

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

router.get('/google', passport.authorize('google', {scope: ['profile', 'email']}));
router.get('/google/callback', passport.authorize('google', {failureRedirect: '/test'}), UserController.registrationByGoogle);
router.get('/google/callback', passport.authorize('google', {failureRedirect: '/test'}), UserController.loginByGoogle);










