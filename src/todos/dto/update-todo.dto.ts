import mongoose from 'mongoose';

export class UpdateTodoDto {
	todoId: mongoose.Types.ObjectId;
	userId: mongoose.Types.ObjectId;
	text?: string;
	completed?: boolean;
}