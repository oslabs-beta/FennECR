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
Object.defineProperty(exports, "__esModule", { value: true });
const client_ecr_1 = require("@aws-sdk/client-ecr");
// Function to configure AWS credentials dynamically
const getECRClient = (accountId) => {
    const region = process.env[`AWS_REGION_${accountId}`];
    const accessKeyId = process.env[`AWS_ACCESS_KEY_ID_${accountId}`];
    const secretAccessKey = process.env[`AWS_SECRET_ACCESS_KEY_${accountId}`];
    if (!region || !accessKeyId || !secretAccessKey) {
        throw new Error(`Missing AWS credentials for account ID ${accountId}`);
    }
    return new client_ecr_1.ECRClient({
        region: region,
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
        },
    });
};
const imagesController = {
    getImages: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { repoName, accountId } = req.params;
        try {
            const ecrClient = getECRClient(accountId);
            const input = {
                repositoryName: repoName,
            };
            const command = new client_ecr_1.DescribeImagesCommand(input);
            const data = yield ecrClient.send(command);
            console.log("Images data from ECR:", data);
            // Store images data in session
            req.session.images = data;
            res.locals.images = data;
            return next();
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error when retrieving images from ECR." });
        }
    }),
};
exports.default = imagesController;
