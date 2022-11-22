import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';

export class App {

	init() {
		const uri = process.env.MONGO;
		mongoose.connect(uri!)
			.then(() => console.log('Database connection'))
			.catch(console.log);

		const app = express();
		const port = process.env.PORT;

		app.listen(port, () => {
			console.log('Server started on port ' + port);
		});
	}
}