import { authRouter } from './auth/auth.controller';
import express, { json } from 'express';
import mongoose from 'mongoose';

import { ConfigService } from './config/config.service';
import { errorMiddleware } from './errors/error.middleware';
import { todosRouter } from './todos/todos.controller';

export class App {

	init() {
		const app = express();
		const uri = ConfigService.get('MONGO');
		const port = ConfigService.get('PORT');;

		mongoose.connect(uri!)
			.then(() => console.log('Database connection'))
			.catch(console.log);

		app.use(json());
		app.use('/auth', authRouter);
		app.use('/todos', todosRouter);

		app.use(errorMiddleware);

		app.listen(port, () => {
			console.log('Server started on port ' + port);
		});
	}
}