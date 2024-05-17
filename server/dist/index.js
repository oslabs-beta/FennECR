"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const imagesController_1 = __importDefault(require("./controllers/imagesController"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Routers
app.get("/", (req, res) => {
    res.send("InsightECR ts server is running.");
});
// getImages
app.get('/images/:repoName', imagesController_1.default.getImages, (req, res) => {
    res.status(200).send(...res.locals.images); //use res.locals.xxx to pass variables/response
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`InsightECR server is running at http://localhost:${port}`);
});
