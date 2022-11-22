import { body } from 'express-validator';
import { authErrors } from '../auth.constants';

export const checkRegisterDto = [
	body('name').isString().isLength({ min: 2 }).withMessage(authErrors.REGISTER_NAME_LENGTH_ERROR),
	body('email').isEmail(),
	body('password').isString().isLength({ min: 6 }).withMessage(authErrors.REGISTER_PASSWORD_LENGTH_ERROR),
]

export const checkLoginDto = [
	body('email').isEmail(),
	body('password').isString(),
]