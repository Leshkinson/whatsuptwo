import {check, validationResult} from 'express-validator';

export const myValidationResult = validationResult.withDefaults({
    formatter: error => {
        return {
            message: error.msg,
            field: error.param
        };
    },
});

export const ValidationEmail = check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email has incorrect view. (Type doesn't match pattern)")