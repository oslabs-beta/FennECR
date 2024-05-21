import { Router, Request, Response } from "express";
import imagesController from "../controllers/imagesController";
import dataBaseController from "../controllers/dataBaseController";

const imagesRouter = Router();

imagesRouter.get(
  "/:accountId/:repoName",
  imagesController.getImages,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.images);
  }
);

imagesRouter.post(
  "/store/:accountId/:repoName",
  dataBaseController.storeImageDetails,
  (req: Request, res: Response) => {
    res.status(200).send("Store images detail success");
  }
);

export default imagesRouter;
