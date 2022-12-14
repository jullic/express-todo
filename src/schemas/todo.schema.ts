import mongoose from 'mongoose';

// schema todo for mongoDB
const todoSchema = new mongoose.Schema({
	author: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		required: true,
		default: false,
	},
});

export const TodoModel = mongoose.model('Todo', todoSchema);
