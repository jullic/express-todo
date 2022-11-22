"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const check_auth_middleware_1 = require("./todos/middlewares/check-auth.middleware");
const auth_controller_1 = require("./auth/auth.controller");
const express_1 = __importStar(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const config_service_1 = require("./config/config.service");
const error_middleware_1 = require("./errors/error.middleware");
const todos_controller_1 = require("./todos/todos.controller");
class App {
    init() {
        // create storage for files
        const storage = multer_1.default.diskStorage({
            destination: 'uploads',
            filename: (req, file, fn) => {
                fn(null, file.originalname);
            }
        });
        const upload = (0, multer_1.default)({ storage });
        const app = (0, express_1.default)();
        const uri = config_service_1.ConfigService.get('MONGO');
        const port = config_service_1.ConfigService.get('PORT');
        ;
        // connect to DB
        mongoose_1.default.connect(uri)
            .then(() => console.log('Database connection'))
            .catch(console.log);
        // enabling cors
        app.use((0, cors_1.default)());
        // enabling recognition json
        app.use((0, express_1.json)());
        // get static file
        app.use('/uploads', express_1.default.static('uploads'));
        // add auth router
        app.use('/auth', auth_controller_1.authRouter);
        // add todos router
        app.use('/todos', todos_controller_1.todosRouter);
        // upload file
        app.post('/uploads', check_auth_middleware_1.checkAuth, upload.single('file'), (req, res) => {
            var _a;
            res.json({
                url: `/uploads/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname}`,
            });
        });
        // add error middleware
        app.use(error_middleware_1.errorMiddleware);
        // server listen
        app.listen(port, () => {
            console.log('Server started on port ' + port);
        });
    }
}
exports.App = App;
