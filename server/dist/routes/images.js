"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imagesController_1 = __importDefault(require("../controllers/imagesController"));
const dataBaseController_1 = __importDefault(require("../controllers/dataBaseController"));
const imagesRouter = (0, express_1.Router)();
imagesRouter.get('/:accountId/:repoName', imagesController_1.default.getImages, (req, res) => {
    res.status(200).json(res.locals.images);
});
imagesRouter.post('/store/:accountId/:repoName', dataBaseController_1.default.storeImageDetails, (req, res) => {
    res.status(200).send("Store images detail success");
});
exports.default = imagesRouter;
