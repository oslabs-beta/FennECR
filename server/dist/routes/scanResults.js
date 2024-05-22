"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scanResultsController_1 = __importDefault(require("../controllers/scanResultsController"));
const dataHandlingController_1 = __importDefault(require("../controllers/dataHandlingController"));
const scanResultsRouter = (0, express_1.Router)();
// Get single scan result from given image tag
scanResultsRouter.get('/:accountId/:repoName/:imageTag', scanResultsController_1.default.getSingleScanResult, (req, res) => {
    res.status(200).json(res.locals.singleScanResult);
});
// Get aggregated scan results from given repo
scanResultsRouter.get('/:accountId/:repoName', scanResultsController_1.default.getAggregatedScanResults, dataHandlingController_1.default.aggregateScanResults, (req, res) => {
    res.status(200).json(res.locals.results);
});
exports.default = scanResultsRouter;
