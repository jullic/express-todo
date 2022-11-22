import { DeleteTodoDto } from './dto/delete-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetOneTodoDto } from './dto/get-one-todo.dto';
import { GetTodoDto } from './dto/get-todos.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoModel } from './../schemas/todo.schema';
import { ForbiddenError, NotFoundError } from '../errors/http-errors';

// todo management service

export class TodosService {

	// method for create todo
	async createTodo({ text, userId }: CreateTodoDto) {
		return await new TodoModel({ author: userId, text }).save();
	}

	// method for get todos
	async getTodos({ query, userId }: GetTodoDto) {

		const todos = query.page ?
			await TodoModel
				.find({ author: userId, text: new RegExp(query.text || /.*/) })
				.skip((query.page) * (query.limit ? query.limit : 10))
				.limit(query.limit ? query.limit : 10)
				.exec()
			:
			await TodoModel
				.find({ author: userId, text: new RegExp(query.text || /.*/) })
				.exec();


		return todos;
	}

	// method for get todo
	async getOneTodo({ todoId, userId }: GetOneTodoDto) {

		const todo = await TodoModel.findById(todoId);
		// checking for existence
		if (!todo) {
			throw new NotFoundError('Не найдено');
		}
		// checking access rights
		if (String(todo.author) !== String(userId)) {
			throw new ForbiddenError('Нет доступа');
		}
		return todo;
	}

	// method for update todo
	async updateTodo(dto: UpdateTodoDto) {
		const todo = await TodoModel.findById(dto.todoId);
		// checking for existence
		if (!todo) {
			throw new NotFoundError('Не найдено');
		}
		// checking access rights
		if (String(todo.author) !== String(dto.userId)) {
			throw new ForbiddenError('Нет доступа');
		}

		return await TodoModel.findByIdAndUpdate(dto.todoId, { text: dto.text || todo.text, completed: dto.completed || todo.completed }, { new: true });
	}

	// method for delete todo
	async deleteTodo(dto: DeleteTodoDto) {
		const todo = await TodoModel.findById(dto.todoId);
		// checking for existence
		if (!todo) {
			throw new NotFoundError('Не найдено');
		}
		// checking access rights
		if (String(todo.author) !== String(dto.userId)) {
			throw new ForbiddenError('Нет доступа');
		}

		return await TodoModel.findByIdAndDelete(dto.todoId, { new: true });
	}
}	