"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Configure the DynamoDB client to point to the local DynamoDB instance
const ddbClient = new client_dynamodb_1.DynamoDBClient({
    region: "us-east-1",
    endpoint: process.env.DYNAMODB_ENDPOINT, // Point to DynamoDB Docker service or local DynamoDB
    credentials: {
        accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
        secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY,
    },
});
const ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(ddbClient);
exports.default = ddbDocClient;
