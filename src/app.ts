import { checkAuth } from './todos/middlewares/check-auth.middleware';
import { authRouter } from './auth/auth.controller';
import express, { json } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import { ConfigService } from './config/config.service';
import { errorMiddleware } from './errors/error.middleware';
import { todosRouter } from './todos/todos.controller';

export class App {

	init() {
		// create storage for files
		const storage = multer.diskStorage({
			destination: 'uploads',
			filename: (req, file, fn) => {
				fn(null, file.originalname);
			}
		});
		const upload = multer({ storage });
		const app = express();
		const uri = ConfigService.get('MONGO');
		const port = ConfigService.get('PORT');;

		// connect to DB
		mongoose.connect(uri!)
			.then(() => console.log('Database connection'))
			.catch(console.log);

		// enabling cors
		app.use(cors());
		// enabling recognition json
		app.use(json());
		// get static file
		app.use('/uploads', express.static('uploads'))
		// add auth router
		app.use('/auth', authRouter);
		// add todos router
		app.use('/todos', todosRouter);
		// upload file
		app.post('/uploads', checkAuth, upload.single('file'), (req, res) => {
			res.json({
				url: `/uploads/${req.file?.originalname}`,
			})
		});

		// add error middleware
		app.use(errorMiddleware);
		// server listen
		app.listen(port, () => {
			console.log('Server started on port ' + port);
		});
	}
}