"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const credential_provider_env_1 = require("@aws-sdk/credential-provider-env");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Configure the DynamoDB client to point to the local DynamoDB instance
const ddbClient = new client_dynamodb_1.DynamoDBClient({
    region: process.env.AWS_REGION_1 || "us-east-1",
    endpoint: "http://localhost:8000", // Point to local DynamoDB
    credentials: (0, credential_provider_env_1.fromEnv)(),
});
const ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(ddbClient);
exports.default = ddbDocClient;
