"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_ecr_1 = require("@aws-sdk/client-ecr");
const awsClients_1 = __importDefault(require("../utils/awsClients"));
const repositoriesController = {
    getAllRepositories: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { accountId } = req.params;
        //console.log(`getAllRepositories middleware hit`)
        try {
            const ecrClient = awsClients_1.default.getECRClient(accountId);
            const input = {};
            const command = new client_ecr_1.DescribeRepositoriesCommand(input);
            const data = yield ecrClient.send(command);
            //console.log(data)
            res.locals.repositories = data;
            return next();
        }
        catch (error) {
            return next({
                log: `Error in repositoriesController.getAllRepositories: ${error}`,
                status: 500,
                message: { err: 'Error fetching all repositories data' },
            });
        }
    }),
    getRepositoryData: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { repoName, accountId } = req.params;
        const ecrClient = awsClients_1.default.getECRClient(accountId);
        const input = {
            repositoryNames: [repoName],
        };
        const command = new client_ecr_1.DescribeRepositoriesCommand(input);
        try {
            const data = yield ecrClient.send(command);
            res.locals.repository = data;
            return next();
        }
        catch (error) {
            return next({
                log: `Error in repositoriesController.getRepositoryData: ${error}`,
                status: 500,
                message: { err: 'Error fetching repository data' },
            });
        }
    }),
    toggleScanOnPush: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { repoName, accountId } = req.params;
        const { scanOnPush } = req.body;
        const ecrClient = awsClients_1.default.getECRClient(accountId);
        const command = new client_ecr_1.PutImageScanningConfigurationCommand({
            repositoryName: repoName,
            imageScanningConfiguration: { scanOnPush: scanOnPush },
        });
        try {
            yield ecrClient.send(command);
            res.locals.scanOnPush = scanOnPush;
            return next();
        }
        catch (error) {
            return next({
                log: `Error in repositoriesController.toggleScanOnPush: ${error}`,
                status: 500,
                message: { err: 'Error toggling scan on push' },
            });
        }
    }),
};
exports.default = repositoriesController;
