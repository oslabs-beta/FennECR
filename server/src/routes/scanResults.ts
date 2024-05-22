import { Router, Request, Response } from 'express';
import scanResultsController from '../controllers/scanResultsController';
import dataHandlingController from '../controllers/dataHandlingController';
import dataBaseController from '../controllers/dataBaseController';

const scanResultsRouter = Router();

// Get single scan result with given image tag from ECR, and save the data to DynamoDB
scanResultsRouter.get(
  '/:accountId/:repoName/:imageTag',
  scanResultsController.getSingleScanResult,
  dataBaseController.storeScanResultData,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.singleScanResult);
  }
);

// Get aggregated scan results from given repo
scanResultsRouter.get(
  '/:accountId/:repoName',
  scanResultsController.getAggregatedScanResults,
  dataHandlingController.aggregateScanResults,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.severityCounts);
  }
);

export default scanResultsRouter;
