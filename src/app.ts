import express from 'express';
import 'dotenv/config';

export class App {

	init() {
		const app = express();
		const port = process.env.PORT;

		app.listen(port, () => {
			console.log('Server started on port ' + port);
		});
	}
}