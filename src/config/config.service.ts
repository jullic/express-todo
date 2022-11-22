import 'dotenv/config';

export class ConfigService {
	static get(name: string) {
		return process.env[name] || '';
	}
}