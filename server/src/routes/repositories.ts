import { Router, Request, Response } from 'express';
import repositoriesController from '../controllers/repositoriesController';

const repositoriesRouter = Router();

// Get single repository data with name
repositoriesRouter.get(
  '/:accountId/:repoName',
  repositoriesController.getRepositoryData,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.repository);
  }
);

// Get all repositories data
repositoriesRouter.get(
  '/:accountId',
  repositoriesController.getAllRepositories,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.repositories);
  }
);

// Toggle scan on push
repositoriesRouter.post(
  '/:accountId/:repoName/scan-on-push',
  repositoriesController.toggleScanOnPush,
  (req: Request, res: Response) => {
    res.status(200).json({ scanOnPush: res.locals.scanOnPush });
  }
);

export default repositoriesRouter;
