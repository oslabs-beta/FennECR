import { Request, Response, NextFunction } from 'express';
import {
  ECRClient,
  DescribeRepositoriesCommand,
  DescribeRepositoriesCommandInput,
  PutImageScanningConfigurationCommand,
} from '@aws-sdk/client-ecr';

// Function to configure AWS credentials dynamically
const getECRClient = (accountId: string) => {
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
};

const repositoriesController = {
  getAllRepositories: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { accountId } = req.params;

    console.log({
      region: process.env[`AWS_REGION_${accountId}`],
      accessKeyId: process.env[`AWS_ACCESS_KEY_ID_${accountId}`],
      secretAccessKey: process.env[`AWS_SECRET_ACCESS_KEY_${accountId}`],
    });

    try {
      const ecrClient = getECRClient(accountId);
      const input: DescribeRepositoriesCommandInput = {};
      const command = new DescribeRepositoriesCommand(input);

      const data = await ecrClient.send(command);
      //console.log(data)
      res.locals.repositories = data;
      return next();
    } catch (error) {
      return next({
        log: `Error in repositoriesController.getAllRepositories: ${error}`,
        status: 500,
        message: { err: 'Error fetching all repositories data' },
      });
    }
  },

  getRepositoryData: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { repoName, accountId } = req.params;
    // console.log(accountId)
    console.log({
      region: process.env[`AWS_REGION_${accountId}`],
      accessKeyId: process.env[`AWS_ACCESS_KEY_ID_${accountId}`],
      secretAccessKey: process.env[`AWS_SECRET_ACCESS_KEY_${accountId}`],
    });
    const ecrClient = getECRClient(accountId);

    const input:DescribeRepositoriesCommandInput = {
      repositoryNames: [repoName],
    }
    const command = new DescribeRepositoriesCommand(input);

    try {
      const data = await ecrClient.send(command);
      res.locals.repository = data;
      return next();
    } catch (error) {
      return next({
        log: `Error in repositoriesController.getRepositoryData: ${error}`,
        status: 500,
        message: { err: 'Error fetching repository data' },
      });
    }
  },

  toggleScanOnPush: async (req: Request, res: Response, next: NextFunction) => {
    const { repoName, accountId } = req.params;
    const { scanOnPush } = req.body;
    const ecrClient = getECRClient(accountId);

    const command = new PutImageScanningConfigurationCommand({
      repositoryName: repoName,
      imageScanningConfiguration: { scanOnPush: scanOnPush },
    });

    try {
      await ecrClient.send(command);
      res.locals.scanOnPush = scanOnPush;
      return next();
    } catch (error) {
      return next({
        log: `Error in repositoriesController.toggleScanOnPush: ${error}`,
        status: 500,
        message: { err: 'Error toggling scan on push' },
      });
    }
  },
};

export default repositoriesController;
