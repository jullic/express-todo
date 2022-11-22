import mongoose from 'mongoose';

export class GetOneTodoDto {
	todoId: mongoose.Types.ObjectId;
	userId: mongoose.Types.ObjectId;
}