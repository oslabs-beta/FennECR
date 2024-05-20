import { Request, Response, NextFunction } from "express";
import {
  DescribeImagesCommand,
  DescribeImagesCommandInput,
} from "@aws-sdk/client-ecr";
import awsClients from "../utils/awsClients";

const imagesController = {
  getImages: async (req: Request, res: Response, next: NextFunction) => {
    const { repoName } = req.params;
    const { accountId } = req.params;

    try {
      const ecrClient = awsClients.getECRClient(accountId);
      // Define the input variable using DescribeImagesCommandInput
      const input: DescribeImagesCommandInput = {
        repositoryName: repoName,
      };
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
