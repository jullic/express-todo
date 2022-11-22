import jwt from 'jsonwebtoken';
import { Handler, Request, RequestHandler } from 'express';

import { ConfigService } from './../../config/config.service';
import { ForbiddenError } from './../../errors/http-errors';
import mongoose from 'mongoose';

export const checkAuth: RequestHandler<Record<string, any>, any, any, any> = (req, res, next) => {
	const token = req.headers.authorization?.replace(/Bearer/gim, '').trim();
	if (!token) {
		throw new ForbiddenError('Нет доступа');
	}
	const access = jwt.verify(token, ConfigService.get('SECRET')) as { id: mongoose.Types.ObjectId };
	req.body.userId = access.id;
	next();
};