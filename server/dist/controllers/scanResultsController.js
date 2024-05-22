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
const scanResultsController = {
    getSingleScanResult: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { repoName, accountId, imageTag } = req.params;
        try {
            const ecrClient = awsClients_1.default.getECRClient(accountId);
            const input = {
                repositoryName: repoName, //required
                imageId: {
                    //required
                    imageTag: imageTag,
                },
            };
            const command = new client_ecr_1.DescribeImageScanFindingsCommand(input);
            const data = yield ecrClient.send(command);
            res.locals.singleScanResult = data;
            return next();
        }
        catch (error) {
            return next({
                log: `Error in scanResultsController.getSingleScanResults: ${error}`,
                status: 500,
                message: { err: 'Error fetching scan result from given image' },
            });
        }
    }),
    getAggregatedScanResults: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { repoName, accountId } = req.params;
        try {
            const ecrClient = awsClients_1.default.getECRClient(accountId);
            // Fetch all image tags in the given repository
            const listImagesInput = {
                repositoryName: repoName,
            };
            const listImagesCommand = new client_ecr_1.ListImagesCommand(listImagesInput);
            const listImagesResponse = yield ecrClient.send(listImagesCommand);
            // Check whether the given repository have images at all
            if (!listImagesResponse.imageIds ||
                listImagesResponse.imageIds.length === 0) {
                return next({
                    status: 404,
                    message: 'No images found in the repository',
                });
            }
            // Fetch scan results for each image
            const scanResults = [];
            for (const imageId of listImagesResponse.imageIds) {
                const input = {
                    repositoryName: repoName,
                    imageId: imageId,
                };
                const command = new client_ecr_1.DescribeImageScanFindingsCommand(input);
                // Prevent 'ScanNotFoundException'
                try {
                    const data = yield ecrClient.send(command);
                    if (data.imageScanFindings)
                        scanResults.push(data);
                }
                catch (err) {
                    if (err.name === 'ScanNotFoundException') {
                        // Skip images without scan result
                        console.log(`Scan result not found for image: ${imageId.imageDigest || imageId.imageTag}`);
                    }
                    else {
                        // update for better error handling
                        console.error(`Error fetching scan result for image: ${imageId.imageDigest || imageId.imageTag}`, err);
                        return res.status(500).json({ error: 'Error fetching scan results' });
                    }
                }
            }
            // for (const scanResult of scanResults) {
            //   console.log(`I am scanResults: ${JSON.stringify(scanResult)}`)
            // }
            res.locals.scanResults = scanResults;
            return next();
        }
        catch (error) {
            return next({
                log: `Error in scanResultsController.getAggregatedScanResults: ${error}`,
                status: 500,
                message: { err: 'Error fetching scan result from given repo' },
            });
        }
    }),
};
exports.default = scanResultsController;
