import { Request, Response, NextFunction } from 'express';
import {
  ListImagesCommand,
  ListImagesCommandInput,
  DescribeImageScanFindingsCommand,
  DescribeImageScanFindingsCommandInput,
} from '@aws-sdk/client-ecr';
import awsClients from '../utils/awsClients';

const scanResultsController = {
  getSingleScanResult: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { repoName, accountId, imageTag } = req.params;

    try {
      const ecrClient = awsClients.getECRClient(accountId);
      const input: DescribeImageScanFindingsCommandInput = {
        repositoryName: repoName, //required
        imageId: {
          //required
          imageTag: imageTag,
        },
      };
      const command = new DescribeImageScanFindingsCommand(input);

      const data = await ecrClient.send(command);
      res.locals.singleScanResult = data;
      return next();
    } catch (error) {
      return next({
        log: `Error in scanResultsController.getSingleScanResults: ${error}`,
        status: 500,
        message: { err: 'Error fetching scan result from given image' },
      });
    }
  },

  getAggregatedScanResults: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { repoName, accountId } = req.params;

    try {
      const ecrClient = awsClients.getECRClient(accountId);

      // Fetch all image tags in the given repository
      const listImagesInput: ListImagesCommandInput = {
        repositoryName: repoName,
      };
      const listImagesCommand = new ListImagesCommand(listImagesInput);
      const listImagesResponse = await ecrClient.send(listImagesCommand);
      // Check whether the given repository have images at all
      if (
        !listImagesResponse.imageIds ||
        listImagesResponse.imageIds.length === 0
      ) {
        return next({
          status: 404,
          message: 'No images found in the repository',
        });
      }

      // Fetch scan results for each image
      const scanResults = [];
      for (const imageId of listImagesResponse.imageIds) {
        const input: DescribeImageScanFindingsCommandInput = {
          repositoryName: repoName,
          imageId: imageId,
        };
        const command = new DescribeImageScanFindingsCommand(input);
        // Prevent 'ScanNotFoundException'
        try {
          const data = await ecrClient.send(command);
          if (data.imageScanFindings) scanResults.push(data);
        } catch (err: any) {
          if (err.name === 'ScanNotFoundException') {
            // Skip images without scan result
            console.log(
              `Scan result not found for image: ${
                imageId.imageDigest || imageId.imageTag
              }`
            );
          } else {
            // update for better error handling
            console.error(`Error fetching scan result for image: ${imageId.imageDigest || imageId.imageTag}`, err);
            return res.status(500).json({ error: 'Error fetching scan results' });
          }
        }
      }
      // for (const scanResult of scanResults) {
      //   console.log(`I am scanResults: ${JSON.stringify(scanResult)}`)
      // }
      res.locals.scanResults = scanResults;
      
      return next();
    } catch (error) {
      return next({
        log: `Error in scanResultsController.getAggregatedScanResults: ${error}`,
        status: 500,
        message: { err: 'Error fetching scan result from given repo' },
      });
    }
  },
};

export default scanResultsController;
