import {Router} from "express";
import {ValidationEmail} from "../validator/validator";
import {UserController} from "../controllers/user-controller";
import {isErrorMiddleware} from "../middleware/error-handler";

export const router = Router();

router.post('/api/registration', ValidationEmail, isErrorMiddleware, UserController.registration);
router.post('/api/login', ValidationEmail, isErrorMiddleware, UserController.login);
router.post('/api/logout', ValidationEmail, isErrorMiddleware, UserController.logout);

router.get('/api/activated/:link', UserController.activated);
router.get('/api/users', UserController.getUsers);
