import { Router, Request, Response } from 'express';
import scanResultsController from '../controllers/scanResultsController';
import dataHandlingController from '../controllers/dataHandlingController';

const scanResultsRouter = Router();

// Get single scan result from given image tag
scanResultsRouter.get(
  '/:accountId/:repoName/:imageTag',
  scanResultsController.getSingleScanResult,
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
    res.status(200).json(res.locals.results);
  }
);

export default scanResultsRouter;
