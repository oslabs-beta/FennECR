import { Router, Request, Response, NextFunction } from "express";
import imagesController from "../controllers/imagesController";
import dataBaseController from "../controllers/dataBaseController";

const imagesRouter = Router();

//  Read the images details from specified Repo under current account. 
imagesRouter.get(
  "/:accountId/:repoName",
  imagesController.getImages,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.images);
  }
);

// Store the images data to the DynamoDB
imagesRouter.post(
  "/store/:accountId/:repoName",
  dataBaseController.storeImageDetails,
  (req: Request, res: Response) => {
    res.status(200).send("Save images detail to the DB is success");
  }
);

// Read the images data from DynamoDB
imagesRouter.get(
    '/readimg/:accountId/:repoName',
    dataBaseController.readImageDataFromTable,
    (req:Request,res:Response,next:NextFunction) => {
        res.status(200).json(res.locals.imgDataFromDB);
    }
)

// Read the scan result from DynamoDB
imagesRouter.get(
    '/readscanresult/:accountId/:reponame',
    dataBaseController.readScanResultDataFromTable,
    (req:Request,res:Response,next:NextFunction) => {
        res.status(200).json(res.locals.resultDataFromDB)
    }
)

export default imagesRouter;
