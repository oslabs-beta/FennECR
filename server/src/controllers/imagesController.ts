import { Request, Response, NextFunction } from "express";
import {
  ECRClient,
  DescribeImagesCommand,
  DescribeImagesCommandInput,
} from "@aws-sdk/client-ecr";
import session from 'express-session'; // Add this import to make sure TypeScript knows about the extended session

// Function to configure AWS credentials dynamically
const getECRClient = (accountId: string) => {
  const region = process.env[`AWS_REGION_${accountId}`];
  const accessKeyId = process.env[`AWS_ACCESS_KEY_ID_${accountId}`];
  const secretAccessKey = process.env[`AWS_SECRET_ACCESS_KEY_${accountId}`];

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error(`Missing AWS credentials for account ID ${accountId}`);
  }

  return new ECRClient({
    region: region,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });
};

const imagesController = {
  getImages: async (req: Request, res: Response, next: NextFunction) => {
    const { repoName, accountId } = req.params;

    try {
      const ecrClient = getECRClient(accountId);
      const input: DescribeImagesCommandInput = {
        repositoryName: repoName,
      };
      const command = new DescribeImagesCommand(input);
      const data = await ecrClient.send(command);
      console.log("Images data from ECR:", data);

      // Ensure imageDetails is always an array
      const imageDetails = data.imageDetails || [];

      // Store images data in session
      req.session.images = { imageDetails };
      res.locals.images = { imageDetails };
      return next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error when retrieving images from ECR." });
    }
  },
};

export default imagesController;
