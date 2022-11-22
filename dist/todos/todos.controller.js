"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const check_auth_middleware_1 = require("./middlewares/check-auth.middleware");
const express_1 = require("express");
const todos_service_1 = require("./todos.service");
const http_errors_1 = require("../errors/http-errors");
const check_dto_middlewares_1 = require("./middlewares/check-dto.middlewares");
const express_validator_1 = require("express-validator");
// router for todo
exports.todosRouter = (0, express_1.Router)();
const todosService = new todos_service_1.TodosService();
// route for create todo
exports.todosRouter.post('/', check_auth_middleware_1.checkAuth, ...check_dto_middlewares_1.checkCreateTodoDto, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // check errors
    const errors = (0, express_validator_1.validationResult)(req);
    try {
        if (!errors.isEmpty()) {
            throw new http_errors_1.BaseError(400, 'Bad request', errors.array());
        }
        res.status(201).json(yield todosService.createTodo({ text: req.body.text, userId: req.body.userId }));
    }
    catch (error) {
        // error handling via middleware
        next(error);
    }
}));
// route for get todos with pagination and filter for text
exports.todosRouter.get('/', check_auth_middleware_1.checkAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        page: req.query.page,
        limit: req.query.limit,
        text: req.query.text
    };
    const dto = {
        userId: req.body.userId,
        query
    };
    try {
        res.json(yield todosService.getTodos(dto));
    }
    catch (error) {
        // error handling via middleware
        next(error);
    }
}));
// route for get one todo
exports.todosRouter.get('/:id', check_auth_middleware_1.checkAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = {
        todoId: req.params.id,
        userId: req.body.userId
    };
    try {
        res.json(yield todosService.getOneTodo(dto));
    }
    catch (err) {
        // error handling via middleware
        next(err);
    }
}));
// route for update todo
exports.todosRouter.patch('/:id', check_auth_middleware_1.checkAuth, ...check_dto_middlewares_1.checkUpdateTodoDto, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // check errors
    const errors = (0, express_validator_1.validationResult)(req);
    const dto = {
        todoId: req.params.id,
        userId: req.body.userId,
        text: req.body.text,
        completed: req.body.completed,
    };
    try {
        if (!errors.isEmpty()) {
            throw new http_errors_1.BaseError(400, 'Bad request', errors.array());
        }
        res.json(yield todosService.updateTodo(dto));
    }
    catch (err) {
        // error handling via middleware
        next(err);
    }
}));
// route for delete todo
exports.todosRouter.delete('/:id', check_auth_middleware_1.checkAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = {
        todoId: req.params.id,
        userId: req.body.userId,
    };
    try {
        res.json(yield todosService.deleteTodo(dto));
    }
    catch (err) {
        // error handling via middleware
        next(err);
    }
}));
