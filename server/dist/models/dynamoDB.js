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
    region: 'us-east-1',
    //   endpoint: 'http://dynamodb:8000', // Point to DynamoDB Docker service or local DynamoDB
    endpoint: 'http://localhost:8000', // Point to DynamoDB Docker service or local DynamoDB
});
const ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(ddbClient);
exports.default = ddbDocClient;
