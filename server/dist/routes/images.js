"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imagesController_1 = __importDefault(require("../controllers/imagesController"));
const dataBaseController_1 = __importDefault(require("../controllers/dataBaseController"));
const imagesRouter = (0, express_1.Router)();
//  Read the images details from specified Repo under current account. 
imagesRouter.get("/:accountId/:repoName", imagesController_1.default.getImages, (req, res) => {
    res.status(200).json(res.locals.images);
});
// Store the images data to the DynamoDB
imagesRouter.post("/store/:accountId/:repoName", imagesController_1.default.getImages, dataBaseController_1.default.storeImageDetails, (req, res) => {
    res.status(200).send("Save images detail to the DB is success");
});
// Read the images data from DynamoDB
imagesRouter.get('/readimg/:accountId/:repoName', dataBaseController_1.default.readImageDataFromTable, (req, res, next) => {
    res.status(200).json(res.locals.imgDataFromDB);
});
// Read the scan result from DynamoDB
imagesRouter.get('/readscanresult/:accountId/:reponame', dataBaseController_1.default.readScanResultDataFromTable, (req, res, next) => {
    res.status(200).json(res.locals.resultDataFromDB);
});
exports.default = imagesRouter;
