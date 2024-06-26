import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import repositoriesRouter from './routes/repositories';
import imagesRouter from './routes/images';
import scanResultsRouter from './routes/scanResults';
import { Server } from 'http'; // Import http module and Server type

dotenv.config();

const app: Express = express();
app.use(express.json());

app.use(cors());

// Routers
app.get('/', (req: Request, res: Response) => {
  res.send('FennECR ts server is running.');
});

// Prepare availiable accounts from env for frontend to select
app.get('/accounts', (req, res) => {
  const accountKeys = Object.keys(process.env).filter((key) =>
    key.startsWith('AWS_ACCESS_KEY_ID_')
  );
  if (accountKeys.length > 0) {
    const accountIds = accountKeys.map((key) => key.split('_').pop()); // Extract all account IDs
    const accounts = accountIds.map((accountId) => ({ accountId })); // Create an array of account objects
    res.status(200).json({ accounts });
  } else {
    res
      .status(404)
      .json({ message: 'No account ID found in environment variables' });
  }
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

let server: Server;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    console.log(`FennECR server is running at http://localhost:${port}`);
  });
} else {
  server = app.listen(0); // Start on a random available port for testing
}

export default server;
