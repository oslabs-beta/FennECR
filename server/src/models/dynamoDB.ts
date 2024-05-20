import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

// Configure the DynamoDB client to point to the local DynamoDB instance
const ddbClient = new DynamoDBClient({
//   region: 'us-east-1', 
  endpoint: 'http://localhost:8000', // Point to local DynamoDB
});

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export default ddbDocClient;

