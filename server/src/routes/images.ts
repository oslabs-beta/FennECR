import { Router, Request, Response } from 'express';
import imagesController from '../controllers/imagesController';

const imagesRouter = Router();

imagesRouter.get(
  '/:accountId/:repoName',
  imagesController.getImages,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.images);
  }
);

export default imagesRouter;
