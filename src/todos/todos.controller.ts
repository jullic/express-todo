import { UpdateTodoDto } from './dto/update-todo.dto';
import { checkAuth } from './middlewares/check-auth.middleware';
import { Router } from 'express';
import { GetTodoDto, ITodosQuery } from './dto/get-todos.dto';
import mongoose from 'mongoose';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetOneTodoDto } from './dto/get-one-todo.dto';
import { BaseError } from '../errors/http-errors';
import { DeleteTodoDto } from './dto/delete-todo.dto';
import { checkCreateTodoDto, checkUpdateTodoDto } from './middlewares/check-dto.middlewares';
import { validationResult } from 'express-validator';

// router for todo

export const todosRouter = Router();
const todosService = new TodosService();

// route for create todo
todosRouter.post<Record<string, any>, any, CreateTodoDto>('/', checkAuth, ...checkCreateTodoDto, async (req, res, next) => {
	// check errors
	const errors = validationResult(req);
	try {
		if (!errors.isEmpty()) {
			throw new BaseError(400, 'Bad request', errors.array());
		}
		res.status(201).json(await todosService.createTodo({ text: req.body.text, userId: req.body.userId }));
	} catch (error) {
		// error handling via middleware
		next(error);
	}
});

// route for get todos with pagination and filter for text
todosRouter.get<Record<string, any>, any, { userId: mongoose.Types.ObjectId }, ITodosQuery>('/', checkAuth, async (req, res, next) => {
	const query: ITodosQuery = {
		page: req.query.page,
		limit: req.query.limit,
		text: req.query.text
	}
	const dto: GetTodoDto = {
		userId: req.body.userId,
		query
	}

	try {
		res.json(await todosService.getTodos(dto));
	} catch (error) {
		// error handling via middleware
		next(error);
	}
});

// route for get one todo
todosRouter.get<Record<string, any>, any, Omit<GetOneTodoDto, 'todoId'>>('/:id', checkAuth, async (req, res, next) => {
	const dto: GetOneTodoDto = {
		todoId: req.params.id,
		userId: req.body.userId
	};

	try {
		res.json(await todosService.getOneTodo(dto));
	} catch (err) {
		// error handling via middleware
		next(err);
	}
});

// route for update todo
todosRouter.patch<Record<string, any>, any, UpdateTodoDto>('/:id', checkAuth, ...checkUpdateTodoDto, async (req, res, next) => {
	// check errors
	const errors = validationResult(req);

	const dto: UpdateTodoDto = {
		todoId: req.params.id,
		userId: req.body.userId,
		text: req.body.text,
		completed: req.body.completed,
	};

	try {
		if (!errors.isEmpty()) {
			throw new BaseError(400, 'Bad request', errors.array());
		}
		res.json(await todosService.updateTodo(dto));
	} catch (err) {
		// error handling via middleware
		next(err);
	}
});

// route for delete todo
todosRouter.delete<Record<string, any>, any, DeleteTodoDto>('/:id', checkAuth, async (req, res, next) => {
	const dto: UpdateTodoDto = {
		todoId: req.params.id,
		userId: req.body.userId,
	};

	try {
		res.json(await todosService.deleteTodo(dto));
	} catch (err) {
		// error handling via middleware
		next(err);
	}
});