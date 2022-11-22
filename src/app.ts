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

		// connect to DB
		mongoose.connect(uri!)
			.then(() => console.log('Database connection'))
			.catch(console.log);

		// enabling recognition json
		app.use(json());
		// add auth router
		app.use('/auth', authRouter);
		// add todos router
		app.use('/todos', todosRouter);

		// add error middleware
		app.use(errorMiddleware);
		// server listen
		app.listen(port, () => {
			console.log('Server started on port ' + port);
		});
	}
}