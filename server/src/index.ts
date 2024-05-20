import express,{ Express, NextFunction, Request, Response } from "express";
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv'
import imagesController from "./controllers/imagesController";
import repositoriesController from "./controllers/repositoriesController";

dotenv.config();

// console.log({
//   AWS_REGION_1: process.env.AWS_REGION_1,
//   AWS_ACCESS_KEY_ID_1: process.env.AWS_ACCESS_KEY_ID_1,
//   AWS_SECRET_ACCESS_KEY_1: process.env.AWS_SECRET_ACCESS_KEY_1,
//   AWS_REGION_2: process.env.AWS_REGION_2,
//   AWS_ACCESS_KEY_ID_2: process.env.AWS_ACCESS_KEY_ID_2,
//   AWS_SECRET_ACCESS_KEY_2: process.env.AWS_SECRET_ACCESS_KEY_2,
// });

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
app.get('/images/:repoName',imagesController.getImages, (req:Request, res:Response)=>{
    res.status(200).json(res.locals.images);
});


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
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
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