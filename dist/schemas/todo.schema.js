"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// schema todo for mongoDB
const todoSchema = new mongoose_1.default.Schema({
    author: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
});
exports.TodoModel = mongoose_1.default.model('Todo', todoSchema);
