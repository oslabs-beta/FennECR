"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const repositoriesController_1 = __importDefault(require("../controllers/repositoriesController"));
const repositoriesRouter = (0, express_1.Router)();
// Get single repository data with name
repositoriesRouter.get('/:accountId/:repoName', repositoriesController_1.default.getRepositoryData, (req, res) => {
    res.status(200).json(res.locals.repository);
});
// Get all repositories data
repositoriesRouter.get('/:accountId', repositoriesController_1.default.getAllRepositories, (req, res) => {
    res.status(200).json(res.locals.repositories);
});
// Toggle scan on push
repositoriesRouter.post('/:accountId/:repoName/scan-on-push', repositoriesController_1.default.toggleScanOnPush, (req, res) => {
    res.status(200).json({ scanOnPush: res.locals.scanOnPush });
});
exports.default = repositoriesRouter;
