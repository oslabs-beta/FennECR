"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const repositories_1 = __importDefault(require("./routes/repositories"));
const images_1 = __importDefault(require("./routes/images"));
const scanResults_1 = __importDefault(require("./routes/scanResults"));
const express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Refactor: reconsider this solution
// Configure session middleware with secret from environment variables
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'fallbackSecret',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: false } // Set secure to true if using HTTPS
}));
// Routers
app.get('/', (req, res) => {
    res.send('InsightECR ts server is running.');
});
// Repository routes
app.use('/repository', repositories_1.default);
// Images routes
app.use('/images', images_1.default);
// Scan result routes
app.use('/results', scanResults_1.default);
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'The global error handler caught an unknown middleware error.',
        status: 500,
        message: { err: 'Server error occurred' },
    };
    const errObj = Object.assign(Object.assign({}, defaultErr), err);
    console.log(errObj.log);
    return res.status(errObj.status || 500).json(errObj.message);
});
// 404 Error
app.use((req, res, next) => {
    res.sendStatus(404);
});
// Server settings
const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`InsightECR server is running at http://localhost:${port}`);
// });
let server;
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(port, () => {
        console.log(`InsightECR server is running at http://localhost:${port}`);
    });
}
else {
    server = app.listen(0); // Start on a random available port for testing
}
exports.default = server;
