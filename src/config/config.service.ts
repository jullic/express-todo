import 'dotenv/config';

// getting information from environment variables
export class ConfigService {
	static get(name: string) {
		return process.env[name] || '';
	}
}