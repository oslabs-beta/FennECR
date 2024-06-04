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
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routers
app.get('/', (req, res) => {
    res.send('InsightECR ts server is running.');
});
// Prepare availiable accounts from env for frontend to select
app.get('/accounts', (req, res) => {
    const accountKeys = Object.keys(process.env).filter((key) => key.startsWith('AWS_ACCESS_KEY_ID_'));
    if (accountKeys.length > 0) {
        const accountIds = accountKeys.map((key) => key.split('_').pop()); // Extract all account IDs
        const accounts = accountIds.map((accountId) => ({ accountId })); // Create an array of account objects
        res.status(200).json({ accounts });
    }
    else {
        res
            .status(404)
            .json({ message: 'No account ID found in environment variables' });
    }
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
