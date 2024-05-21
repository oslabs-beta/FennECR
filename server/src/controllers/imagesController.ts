import { Request, Response, NextFunction } from 'express';
import {
  DescribeImagesCommand,
  DescribeImagesCommandInput,
} from "@aws-sdk/client-ecr";
import awsClients from "../utils/awsClients";

const imagesController = {
  getImages: async (req: Request, res: Response, next: NextFunction) => {
    const { repoName, accountId } = req.params;

    try {
      const ecrClient = awsClients.getECRClient(accountId);
      // Define the input variable using DescribeImagesCommandInput
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
      res.status(500).json({ error: 'Error when retrieving images from ECR.' });
    }
  },
};

export default imagesController;
