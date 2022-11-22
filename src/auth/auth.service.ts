import { compare, genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { ConfigService } from '../config/config.service';
import { UnauthorizedError } from '../errors/http-errors';
import { UserModel } from '../schemas/user.schema';
import { authErrors } from './auth.constants';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';


export class AuthService {

	async register(dto: AuthRegisterDto) {
		const isUser = await UserModel.findOne({ email: dto.email });
		if (isUser) {
			throw new UnauthorizedError(authErrors.ALREADY_REGISTERED_ERROR);
		}

		const { password, ...dataDto } = dto;
		const salt = await genSalt(10);
		const data = {
			...dataDto,
			passwordHash: await hash(password, salt),
		};
		const id = (await (new UserModel(data).save()))._id;

		return { id };
	}

	async validateUser({ email, password }: AuthLoginDto) {
		const user = await UserModel.findOne({ email });
		if (!user) {
			throw new UnauthorizedError(authErrors.USER_NOT_FOUND_ERROR);
		}

		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedError(authErrors.USER_NOT_FOUND_ERROR);
		}

		return { id: user._id };
	}

	async login(id: string | mongoose.Types.ObjectId) {
		const payload = { id };
		return {
			access_token: jwt.sign(payload, ConfigService.get('SECRET'))
		}
	}
}