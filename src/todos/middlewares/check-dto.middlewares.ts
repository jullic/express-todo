import { body } from 'express-validator';

export const checkCreateTodoDto = [
	body('text').isString().isLength({ min: 1 }),
]

export const checkUpdateTodoDto = [
	body('text').isString().isLength({ min: 1 }),
	body('compteled').optional().isBoolean(),
]