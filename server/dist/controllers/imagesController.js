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
const imagesController = {
    getImages: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { repoName } = req.params;
        try {
            const command = new client_ecr_1.DescribeImagesCommand({ repositoryName: repoName });
            const data = yield ecrClient.send(command);
            console.log(data);
            res.locals.images = data;
            res.status(200).json(data.imageDetails);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error when retrieving images from ECR." });
        }
    }),
};
// Create the ECRClient 
const ecrClient = new client_ecr_1.ECRClient({ region: process.env.AWS_REGION || "us-east-1" });
exports.default = imagesController;
