import { BaseError } from './../errors/http-errors';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthService } from './auth.service';
import { Request, Response, Router, NextFunction } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { checkLoginDto, checkRegisterDto } from './middlewares/check-dto.middleware';
import { validationResult } from 'express-validator';

export const authRouter = Router();
const authService = new AuthService();

authRouter.post<Record<string, any>, any, AuthLoginDto>('/login', checkLoginDto, async (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	try {
		if (!errors.isEmpty()) {
			throw new BaseError(401, 'Некорректные значения', errors.array());
		}
		const { id } = await authService.validateUser(req.body);
		res.send(await authService.login(id));
	} catch (error) {
		next(error);
	}
});

authRouter.post<Record<string, any>, any, AuthRegisterDto>('/register', checkRegisterDto, async (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	try {
		if (!errors.isEmpty()) {
			throw new BaseError(401, 'Некорректные значения', errors.array());
		}
		const { id } = await authService.register(req.body);
		res.status(201);
		res.send(await authService.login(id));
	} catch (error) {
		next(error)
	}
});