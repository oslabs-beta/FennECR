import { Request, Response, NextFunction } from "express";
import {
  ECRClient,
  DescribeImagesCommand,
  DescribeImagesCommandInput,
} from "@aws-sdk/client-ecr";

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
    const { repoName } = req.params;
    const { accountId } = req.params;

    try {
      const ecrClient = getECRClient(accountId);
      // Define the input variable using DescribeImagesCommandInput
      const input: DescribeImagesCommandInput = {
        repositoryName: repoName,
      };
      //   const command = new DescribeImagesCommand({ repositoryName: repoName });
      const command = new DescribeImagesCommand(input);
      const data = await ecrClient.send(command);
      res.locals.images = data;
      return next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error when retrieving images from ECR." });
    }
  },
};

export default imagesController;
