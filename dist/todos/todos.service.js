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
exports.TodosService = void 0;
const todo_schema_1 = require("./../schemas/todo.schema");
const http_errors_1 = require("../errors/http-errors");
// todo management service
class TodosService {
    // method for create todo
    createTodo({ text, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new todo_schema_1.TodoModel({ author: userId, text }).save();
        });
    }
    // method for get todos
    getTodos({ query, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = query.page ?
                yield todo_schema_1.TodoModel
                    .find({ author: userId, text: new RegExp(query.text || /.*/) })
                    .skip((query.page) * (query.limit ? query.limit : 10))
                    .limit(query.limit ? query.limit : 10)
                    .exec()
                :
                    yield todo_schema_1.TodoModel
                        .find({ author: userId, text: new RegExp(query.text || /.*/) })
                        .exec();
            return todos;
        });
    }
    // method for get todo
    getOneTodo({ todoId, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield todo_schema_1.TodoModel.findById(todoId);
            // checking for existence
            if (!todo) {
                throw new http_errors_1.NotFoundError('Не найдено');
            }
            // checking access rights
            if (String(todo.author) !== String(userId)) {
                throw new http_errors_1.ForbiddenError('Нет доступа');
            }
            return todo;
        });
    }
    // method for update todo
    updateTodo(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield todo_schema_1.TodoModel.findById(dto.todoId);
            // checking for existence
            if (!todo) {
                throw new http_errors_1.NotFoundError('Не найдено');
            }
            // checking access rights
            if (String(todo.author) !== String(dto.userId)) {
                throw new http_errors_1.ForbiddenError('Нет доступа');
            }
            return yield todo_schema_1.TodoModel.findByIdAndUpdate(dto.todoId, { text: dto.text || todo.text, completed: dto.completed || todo.completed }, { new: true });
        });
    }
    // method for delete todo
    deleteTodo(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield todo_schema_1.TodoModel.findById(dto.todoId);
            // checking for existence
            if (!todo) {
                throw new http_errors_1.NotFoundError('Не найдено');
            }
            // checking access rights
            if (String(todo.author) !== String(dto.userId)) {
                throw new http_errors_1.ForbiddenError('Нет доступа');
            }
            return yield todo_schema_1.TodoModel.findByIdAndDelete(dto.todoId, { new: true });
        });
    }
}
exports.TodosService = TodosService;
