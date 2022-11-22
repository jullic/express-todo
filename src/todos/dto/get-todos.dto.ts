import mongoose from 'mongoose';

export class GetTodoDto {
	userId: mongoose.Types.ObjectId;
	query: ITodosQuery;
}

export interface ITodosQuery {
	page: number | undefined;
	limit: number | undefined;
	text: string | undefined;
}