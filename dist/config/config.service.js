"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
require("dotenv/config");
// getting information from environment variables
class ConfigService {
    static get(name) {
        return process.env[name] || '';
    }
}
exports.ConfigService = ConfigService;
