"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./routes"));
const sockets_1 = __importDefault(require("./sockets"));
const PORT = process.env.PORT;
const app = express_1.default();
const sessionMiddleware = express_session_1.default({
    secret: 'mahjong',
    resave: true,
    saveUninitialized: true,
    // genid: () => uuidv4(),
});
app.use(cors_1.default({ origin: ['https://echo.terranceli.com', 'http://localhost:5000'], credentials: true }));
app.use(express_1.default.json());
app.use(sessionMiddleware);
const httpServer = http_1.default.createServer(app);
const io = sockets_1.default(httpServer, sessionMiddleware);
routes_1.default(app, io);
httpServer.listen(PORT, () => {
    console.log('Project Echo Server listening on port ' + PORT);
});
//# sourceMappingURL=app.js.map