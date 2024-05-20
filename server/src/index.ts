import express,{ Express, NextFunction, Request, Response } from "express";
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv'
import imagesController from "./controllers/imagesController";
import repositoriesController from "./controllers/repositoriesController";
import scanResultsController from "./controllers/scanResultsController";
import dataHandlingController from "./controllers/dataHandlingController";

dotenv.config();

const app: Express = express();
app.use(express.json());

app.use(cors());

// Routers
app.get("/",(req:Request, res:Response) => {
    res.send("InsightECR ts server is running.");
});

// Get repository data with name
app.get('/repository/:accountId/:repoName', repositoriesController.getRepositoryData, (req: Request, res: Response) => {
  res.status(200).json(res.locals.repository);
});

// Get all repositories data
app.get('/repository/:accountId', repositoriesController.getAllRepositories, (req: Request, res: Response) => {
  res.status(200).json(res.locals.repositories);
});

// Toggle scan on push
app.post('/repository/:accountId/:repoName/scan-on-push', repositoriesController.toggleScanOnPush, (req: Request, res: Response) => {
  res.status(200).json({ scanOnPush: res.locals.scanOnPush });
});

// getImages
app.get('/images/:accountId/:repoName',imagesController.getImages, (req:Request, res:Response)=>{
    res.status(200).json(res.locals.images);
});

// Get single scan result
app.get('/images/results/:accountId/:repoName/:imageTag',scanResultsController.getSingleScanResult, (req: Request, res: Response) => {
  res.status(200).json(res.locals.singleScanResult);
})

// Get aggregated scan results
app.get('/repository/results/:accountId/:repoName',scanResultsController.getAggregatedScanResults,dataHandlingController.aggregateScanResults, (req: Request, res: Response) => {
  res.status(200).json(res.locals.severityCounts);
})

//Global error handler
interface DefaultError {
    log?:string;
    status?:number;
    message?: {err: string };
}

app.use((err: DefaultError,req:Request, res: Response, next:NextFunction) => {
    const defaultErr: DefaultError = {
        log: "The global error handler caught an unknown middleware error.",
        status: 500,
        message: { err: "Server error occurred" },
    };
    const errObj = {...defaultErr, ...err };
    console.log(errObj.log);
    return res.status(errObj.status || 500).json(errObj.message);
})

// 404 Error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404)
});

// Catch all error handler for debugging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request received for ${req.path}`);
  next();
});


// Server settings
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`InsightECR server is running at http://localhost:${port}`);
})