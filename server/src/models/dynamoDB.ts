import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Configure the DynamoDB client to point to the local DynamoDB instance
const ddbClient = new DynamoDBClient({
  region: "us-east-1",
  endpoint: process.env.DYNAMODB_ENDPOINT, // Point to DynamoDB Docker service or local DynamoDB
  credentials: {
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY as string,
},
});

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export default ddbDocClient;
