import { Request, Response, NextFunction } from "express";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import {
  CreateTableCommand,
  CreateTableCommandInput,
  DescribeTableCommand,
} from "@aws-sdk/client-dynamodb";
import ddbDocClient from "../models/dynamoDB";

const dataBaseController = {
  storeImageDetails: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(
      "Checking session data in storeImageDetails:",
      req.session.images
    );

    if (!req.session.images || !req.session.images.imageDetails) {
      return res.status(400).json({ error: "No image details found to store" });
    }
    // Read the table name from the env config file.
    const tableName = process.env.IMAGES_TABLE_NAME;

    const input: CreateTableCommandInput = {
      AttributeDefinitions: [
        {
          AttributeName: "imageDigest",
          AttributeType: "S",
        },
      ],
      TableName: tableName,
      KeySchema: [
        {
          AttributeName: "imageDigest",
          KeyType: "HASH",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
      },
    };
    // Create table logic
    try {
      // Check if the table already exists
      const describeTableCommand = new DescribeTableCommand({
        TableName: tableName,
      });
      await ddbDocClient.send(describeTableCommand);
      console.log("Images table already exists. Skipping creation.");
    } catch (error) {
      if ((error as { name: string }).name === "ResourceNotFoundException") {
        // If the table does not exist, create it
        console.log("ImagesTable does not exist. Creating table...");
        const createTableCommand = new CreateTableCommand(input);
        const createTableResponse = await ddbDocClient.send(createTableCommand);
        console.log("ImagesTable creation response:", createTableResponse);
      } else {
        console.error("Error checking table existence:", error);
        return res
          .status(500)
          .json({ error: "Could not check table existence" });
      }
    }
    // Write data to database logic
    try {
      const images = req.session.images.imageDetails;
      console.log("Images to store:", images);

      for (const image of images) {
        const putParams = {
          TableName: tableName,
          Item: image,
        };
        await ddbDocClient.send(new PutCommand(putParams));
      }

      res
        .status(200)
        .json({ message: "Images successfully saved to dynamoDB." });
    } catch (error) {
      console.error("Error storing images:", error);
      res.status(500).json({ error: "Could not store images" });
    }
  },
  // Read images detail data from dynamoDB
  readImageDataFromTable: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tableName = process.env.IMAGES_TABLE_NAME;
      const params = {
        TableName: tableName,
      };
      const command = new ScanCommand(params);
      const data = await ddbDocClient.send(command);
      console.log("Data from scan table: ", data);
      res.locals.imgDataFromDB = data.Items;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error occurs when scan table." });
    }
  },
  storeScanResultData:async (req:Request,res:Response,next:NextFunction) =>{
    // Read from scanResult controller
    const scanResults = res.locals.singleScanResult;

    const tableName = process.env.SCAN_RESULT_TABLE;
    const input: CreateTableCommandInput = {
        AttributeDefinitions: [
          {
            AttributeName: 'imageDigest',
            AttributeType: 'S',
          },
        ],
        TableName: tableName,
        KeySchema: [
          {
            AttributeName: 'imageDigest',
            KeyType: 'HASH',
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10,
        },
      };
      try {
        const describeTableCommand = new DescribeTableCommand({ TableName: tableName });
        await ddbDocClient.send(describeTableCommand);
        console.log('Scan result table already exists. Skipping creation.');
      } catch (error) {
        if ((error as { name: string }).name === 'ResourceNotFoundException') {
          console.log('SingleScanResult table does not exist. Creating table...');
          const createTableCommand = new CreateTableCommand(input);
          const createTableResponse = await ddbDocClient.send(createTableCommand);
          console.log('SingleScanResult creation response:', createTableResponse);
        } else {
          console.error('Error checking table existence:', error);
          return res.status(500).json({ error: 'Could not check table existence' });
        }
      }
  
      try {
        const { imageId, imageScanFindings, registryId, repositoryName, imageScanStatus } = scanResults;
        const item = {
          imageDigest: imageId.imageDigest,
          imageTag: imageId.imageTag,
          findings: imageScanFindings.findings,
          findingSeverityCounts: imageScanFindings.findingSeverityCounts,
          imageScanCompletedAt: new Date(imageScanFindings.imageScanCompletedAt).toISOString(),
          vulnerabilitySourceUpdatedAt: new Date(imageScanFindings.vulnerabilitySourceUpdatedAt).toISOString(),
          scanStatus: imageScanStatus.status,
          scanDescription: imageScanStatus.description,
          registryId,
          repositoryName,
        };
  
        const putParams = {
          TableName: tableName,
          Item: item,
        };
        await ddbDocClient.send(new PutCommand(putParams));
  
        res.status(200).json({ message: 'Scan result successfully saved to DynamoDB.' });
        console.log('Scan result successfully saved to DynamoDB.');
      } catch (error) {
        console.error('Error storing scan result:', error);
        res.status(500).json({ error: 'Could not store scan result' });
      }
    },
      // Read Scan Result data from 
  readScanResultDataFromTable: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tableName = process.env.SCAN_RESULT_TABLE;
      const params = {
        TableName: tableName,
      };
      const command = new ScanCommand(params);
      const data = await ddbDocClient.send(command);
      console.log("Data from scan table: ", data);
      res.locals.resultDataFromDB = data.Items;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error occurs when scan table." });
    }
  },
  }

export default dataBaseController;
