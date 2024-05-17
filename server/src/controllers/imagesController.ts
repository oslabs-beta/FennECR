import { NextFunction, Request, Response } from 'express';
import { ECRClient, DescribeImagesCommand } from '@aws-sdk/client-ecr';

interface ImagesController {
    getImages: (req: Request, res: Response) => Promise<void>;
}

const imagesController: ImagesController = {
    getImages: async (req: Request, res: Response) => {
        const { repoName } = req.params;

        try {
            const command = new DescribeImagesCommand({ repositoryName: repoName });
            const data = await ecrClient.send(command);
            console.log(data);
            res.locals.images = data;
            res.status(200).json(data.imageDetails);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error when retrieving images from ECR." });
        }
    },
};

// Create the ECRClient 
const ecrClient = new ECRClient({ region: process.env.AWS_REGION || "us-east-1" });

export default imagesController;
