"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const imagesController_1 = __importDefault(require("./controllers/imagesController"));
const repositoriesController_1 = __importDefault(require("./controllers/repositoriesController"));
dotenv_1.default.config();
// console.log({
//   AWS_REGION_1: process.env.AWS_REGION_1,
//   AWS_ACCESS_KEY_ID_1: process.env.AWS_ACCESS_KEY_ID_1,
//   AWS_SECRET_ACCESS_KEY_1: process.env.AWS_SECRET_ACCESS_KEY_1,
//   AWS_REGION_2: process.env.AWS_REGION_2,
//   AWS_ACCESS_KEY_ID_2: process.env.AWS_ACCESS_KEY_ID_2,
//   AWS_SECRET_ACCESS_KEY_2: process.env.AWS_SECRET_ACCESS_KEY_2,
// });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routers
app.get("/", (req, res) => {
    res.send("InsightECR ts server is running.");
});
// Get repository data with name
app.get('/repository/:accountId/:repoName', repositoriesController_1.default.getRepositoryData, (req, res) => {
    res.status(200).json(res.locals.repository);
});
// Get all repositories data
app.get('/repository/:accountId', repositoriesController_1.default.getAllRepositories, (req, res) => {
    res.status(200).json(res.locals.repositories);
});
// Toggle scan on push
app.post('/repository/:accountId/:repoName/scan-on-push', repositoriesController_1.default.toggleScanOnPush, (req, res) => {
    res.status(200).json({ scanOnPush: res.locals.scanOnPush });
});
// getImages
app.get('/images/:accountId/:repoName', imagesController_1.default.getImages, (req, res) => {
    res.status(200).json(res.locals.images);
});
app.use((err, req, res, next) => {
    const defaultErr = {
        log: "The global error handler caught an unknown middleware error.",
        status: 500,
        message: { err: "Server error occurred" },
    };
    const errObj = Object.assign(Object.assign({}, defaultErr), err);
    console.log(errObj.log);
    return res.status(errObj.status || 500).json(errObj.message);
});
// 404 Error
app.use((req, res, next) => {
    res.status(404).sendFile(path_1.default.join(__dirname, 'public', '404.html'));
});
// Catch all error handler for debugging
app.use((req, res, next) => {
    console.log(`Request received for ${req.path}`);
    next();
});
// Server settings
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`InsightECR server is running at http://localhost:${port}`);
});
