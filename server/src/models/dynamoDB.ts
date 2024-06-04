import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { fromEnv } from "@aws-sdk/credential-provider-env";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Configure the DynamoDB client to point to the local DynamoDB instance
const ddbClient = new DynamoDBClient({
  region: process.env.AWS_REGION_1 || 'us-east-1', 
  endpoint: 'http://dynamodb:8000', // Point to local DynamoDB
  credentials: fromEnv(), 
});

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export default ddbDocClient;

