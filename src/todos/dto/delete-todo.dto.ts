import mongoose from 'mongoose';

export class DeleteTodoDto {
	todoId: mongoose.Types.ObjectId;
	userId: mongoose.Types.ObjectId;
}