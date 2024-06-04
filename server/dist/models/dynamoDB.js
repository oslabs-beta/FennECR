"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
// Configure the DynamoDB client to point to the local DynamoDB instance
const ddbClient = new client_dynamodb_1.DynamoDBClient({
    region: 'us-east-1',
    endpoint: 'http://localhost:8000', // Point to local DynamoDB
});
const ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(ddbClient);
exports.default = ddbDocClient;
