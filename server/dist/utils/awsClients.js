"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_ecr_1 = require("@aws-sdk/client-ecr");
const client_sns_1 = require("@aws-sdk/client-sns");
const awsClients = {
    // Function to configure AWS credentials dynamically
    getECRClient: (accountId) => {
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
    },
    getSNSClient: (accountId) => {
        const region = process.env[`AWS_REGION_${accountId}`];
        const accessKeyId = process.env[`AWS_ACCESS_KEY_ID_${accountId}`];
        const secretAccessKey = process.env[`AWS_SECRET_ACCESS_KEY_${accountId}`];
        if (!region || !accessKeyId || !secretAccessKey) {
            throw new Error(`Missing AWS credentials for account ID ${accountId}`);
        }
        return new client_sns_1.SNSClient({
            region: region,
            credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
            },
        });
    }
};
exports.default = awsClients;
