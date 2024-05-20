import { ECRClient } from '@aws-sdk/client-ecr';
import { SNSClient } from '@aws-sdk/client-sns';

const awsClients = {
  // Function to configure AWS credentials dynamically
  getECRClient: (accountId: string) => {
    const region = process.env[`AWS_REGION_${accountId}`];
    const accessKeyId = process.env[`AWS_ACCESS_KEY_ID_${accountId}`];
    const secretAccessKey = process.env[`AWS_SECRET_ACCESS_KEY_${accountId}`];

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error(`Missing AWS credentials for account ID ${accountId}`);
    }

    return new ECRClient({
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  },
  getSNSClient: (accountId: string) => {
    const region = process.env[`AWS_REGION_${accountId}`];
    const accessKeyId = process.env[`AWS_ACCESS_KEY_ID_${accountId}`];
    const secretAccessKey = process.env[`AWS_SECRET_ACCESS_KEY_${accountId}`];

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error(`Missing AWS credentials for account ID ${accountId}`);
    }

    return new SNSClient({
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  }
};

export default awsClients;
