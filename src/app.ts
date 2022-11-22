import express from 'express';
import mongoose from 'mongoose';

import { ConfigService } from './config/config.service';

export class App {

	init() {
		const uri = ConfigService.get('MONGO');
		mongoose.connect(uri!)
			.then(() => console.log('Database connection'))
			.catch(console.log);

		const app = express();
		const port = ConfigService.get('PORT');;

		app.listen(port, () => {
			console.log('Server started on port ' + port);
		});
	}
}