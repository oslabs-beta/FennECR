import { Request, Response, NextFunction } from "express";
import {
  ECRClient,
  DescribeImagesCommand,
  DescribeImagesCommandInput,
} from "@aws-sdk/client-ecr";

import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { CreateTableCommand,CreateTableCommandInput } from "@aws-sdk/client-dynamodb";
import ddbDocClient from "../models/dynamoDB";

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
    const { repoName,accountId } = req.params;

    try {
      const ecrClient = getECRClient(accountId);
      // Define the input variable using DescribeImagesCommandInput
      const input: DescribeImagesCommandInput = {
        repositoryName: repoName,
      };
      const command = new DescribeImagesCommand(input);
      const data = await ecrClient.send(command);
      console.log('Images data from ECR getImages: ', data);

      res.locals.images = data;
      return next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error when retrieving images from ECR." });
    }
  },
  storeImageDetails: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!res.locals.images || !res.locals.images.imageDetails) {
        return res.status(400).json({ error: 'No image details found to store' });
      }
    const input:CreateTableCommandInput = {
      // CreateTableInput
      AttributeDefinitions: [
        // AttributeDefinitions // required
        {
          // AttributeDefinition
          AttributeName: "imageDigest", // required
          //   AttributeType: "S" || "N" || "B", // required
          AttributeType: "S", // required
        },
      ],
      TableName: "ImagesTable", // required
      KeySchema: [
        // KeySchema // required
        {
          // KeySchemaElement
          AttributeName: "imageDigest", // required
          KeyType: "HASH" || "RANGE", // required
        },
      ],

      ProvisionedThroughput: {
        // ProvisionedThroughput
        ReadCapacityUnits: 3, // required
        WriteCapacityUnits: 3, // required
      },
    };
    try {
      const command = new CreateTableCommand(input);
      const response = await ddbDocClient.send(command);
      console.log(response);
      // Iterate the images from res.local.images
      console.log('res.locals.images ',res.locals.images)
      const images = res.locals.images.imageDetails;
      console.log('images are here: ',images);
      for (const image of images) {
        const putParams = {
          TableName: "ImagesTable",
          Item: image,
        };
        await ddbDocClient.send(new PutCommand(putParams));
      }

      res.status(200).json({ message: "Images stored successfully" });
      return next();

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Could not store images" });
    }
  },
};

export default imagesController;
