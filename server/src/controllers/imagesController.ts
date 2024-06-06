import { Request, Response, NextFunction } from "express";
import {
  DescribeImagesCommand,
  DescribeImagesCommandInput,
} from "@aws-sdk/client-ecr";
import awsClients from "../utils/awsClients";

const imagesController = {
  getImages: async (req: Request, res: Response, next: NextFunction) => {
    const { repoName, accountId } = req.params;

    try {
      const ecrClient = awsClients.getECRClient(accountId); // Define the input variable using DescribeImagesCommandInput
      const input: DescribeImagesCommandInput = {
        repositoryName: repoName,
      };
      const command = new DescribeImagesCommand(input);
      const data = await ecrClient.send(command);

      // Ensure imageDetails is always an array
      const imageDetails = data.imageDetails || [];

      // Store imageDetails in locals
      res.locals.images = { imageDetails };
      return next();
    } catch (error) {
      next(error);
    }
  },
};

export default imagesController;
