import express, { Express, NextFunction, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import repositoriesRouter from './routes/repositories';
import imagesRouter from './routes/images';
import scanResultsRouter from './routes/scanResults';
import session from 'express-session';
import http, { Server } from 'http'; // Import http module and Server type



dotenv.config();

const app: Express = express();
app.use(express.json());

app.use(cors());

// Refactor: reconsider this solution
// Configure session middleware with secret from environment variables
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallbackSecret',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: false } // Set secure to true if using HTTPS
  }));
  

// Routers
app.get('/', (req: Request, res: Response) => {
  res.send('InsightECR ts server is running.');
});

// Repository routes
app.use('/repository', repositoriesRouter);

// Images routes
app.use('/images', imagesRouter);


// Scan result routes
app.use('/results', scanResultsRouter);

//Global error handler
interface DefaultError {
  log?: string;
  status?: number;
  message?: { err: string };
}

app.use(
  (err: DefaultError, req: Request, res: Response, next: NextFunction) => {
    const defaultErr: DefaultError = {
      log: 'The global error handler caught an unknown middleware error.',
      status: 500,
      message: { err: 'Server error occurred' },
    };
    const errObj = { ...defaultErr, ...err };
    console.log(errObj.log);
    return res.status(errObj.status || 500).json(errObj.message);
  }
);

// 404 Error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

// Server settings
const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`InsightECR server is running at http://localhost:${port}`);
// });


let server: Server;

if (process.env.NODE_ENV !== 'test') {
    server = app.listen(port, () => {
        console.log(`InsightECR server is running at http://localhost:${port}`);
    });
} else {
    server = app.listen(0); // Start on a random available port for testing
}

export default server;