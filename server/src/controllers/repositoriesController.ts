import { Request, Response, NextFunction } from 'express';
import {
  DescribeRepositoriesCommand,
  DescribeRepositoriesCommandInput,
  PutImageScanningConfigurationCommand,
} from '@aws-sdk/client-ecr';
import awsClients from '../utils/awsClients';

const repositoriesController = {
  getAllRepositories: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { accountId } = req.params;

    try {
      const ecrClient = awsClients.getECRClient(accountId);
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

    const ecrClient = awsClients.getECRClient(accountId);
    const input: DescribeRepositoriesCommandInput = {
      repositoryNames: [repoName],
    };
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
    const ecrClient = awsClients.getECRClient(accountId);

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
