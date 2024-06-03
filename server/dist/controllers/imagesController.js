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
const imagesController = {
    getImages: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { repoName, accountId } = req.params;
        try {
            const ecrClient = awsClients_1.default.getECRClient(accountId); // Define the input variable using DescribeImagesCommandInput
            const input = {
                repositoryName: repoName,
            };
            const command = new client_ecr_1.DescribeImagesCommand(input);
            const data = yield ecrClient.send(command);
            // Ensure imageDetails is always an array
            const imageDetails = data.imageDetails || [];
            // Store imageDetails in locals
            res.locals.images = { imageDetails };
            return next();
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = imagesController;
