import mongoose from 'mongoose';

// schema user for mongoDB
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
});

export const UserModel = mongoose.model('User', userSchema);
