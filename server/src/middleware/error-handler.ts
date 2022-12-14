import {myValidationResult} from "../validator/validator";
import {NextFunction, Request, Response} from "express";


export const isErrorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errorsMessages: errors.array({onlyFirstError: true})});
    }

    next()
};