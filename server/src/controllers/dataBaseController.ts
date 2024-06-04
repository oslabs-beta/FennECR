import { Request, Response, NextFunction } from "express";
import { PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import {
  CreateTableCommand,
  CreateTableCommandInput,
  DescribeTableCommand,
  ReturnValue,
} from "@aws-sdk/client-dynamodb";
import ddbDocClient from "../models/dynamoDB";

const dataBaseController = {
  storeImageDetails: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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
        console.log(createTableResponse);
      } else {
        console.error("Error checking table existence:", error);
        return next(error);
      }
    }
    // Write data to database logic
    try {
      const images = res.locals.images;

      for (const image of images) {
        const putParams = {
          TableName: tableName,
          Item: image,
        };
        await ddbDocClient.send(new PutCommand(putParams));
      }
      return next()
    } catch (error) {
      console.error("Error storing images:", error);
      return next(error);
    }
  },
  // Read images detail data from dynamoDB
  readImageDataFromTable: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tableName = process.env.IMAGES_TABLE_NAME;
      const params = {
        TableName: tableName,
      };
      const command = new ScanCommand(params);
      const data = await ddbDocClient.send(command);
      res.locals.imgDataFromDB = data.Items;
      return next();
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },
  // storeScanResultData function
  storeScanResultData: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const scanResults = res.locals.singleScanResult;
    const tableName = process.env.SCAN_RESULT_TABLE;

    // Define the table schema
    const input: CreateTableCommandInput = {
      AttributeDefinitions: [
        {
          AttributeName: "imageDigest",
          AttributeType: "S",
        },
        {
          AttributeName: "imageScanCompletedAt",
          AttributeType: "S",
        },
      ],
      TableName: tableName,
      KeySchema: [
        {
          AttributeName: "imageDigest",
          KeyType: "HASH",
        },
        {
          AttributeName: "imageScanCompletedAt",
          KeyType: "RANGE",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
      },
    };

    // Check if the table exists, if not create it
    try {
      const describeTableCommand = new DescribeTableCommand({
        TableName: tableName,
      });
      await ddbDocClient.send(describeTableCommand);
      console.log("Scan result table already exists. Skipping creation.");
    } catch (error) {
      if ((error as { name: string }).name === "ResourceNotFoundException") {
        console.log("SingleScanResult table does not exist. Creating table...");
        const createTableCommand = new CreateTableCommand(input);
        const createTableResponse = await ddbDocClient.send(createTableCommand);
      } else {
        console.error("Error checking table existence:", error);
        return next(error);
      }
    }

    // Update the scan result data
    try {
      const {
        imageId,
        imageScanFindings,
        registryId,
        repositoryName,
        imageScanStatus,
      } = scanResults;
      const item = {
        imageDigest: imageId.imageDigest,
        imageTag: imageId.imageTag,
        findings: imageScanFindings.findings,
        findingSeverityCounts: imageScanFindings.findingSeverityCounts,
        imageScanCompletedAt: new Date(
          imageScanFindings.imageScanCompletedAt
        ).toISOString(),
        vulnerabilitySourceUpdatedAt: new Date(
          imageScanFindings.vulnerabilitySourceUpdatedAt
        ).toISOString(),
        scanStatus: imageScanStatus.status,
        scanDescription: imageScanStatus.description,
        registryId,
        repositoryName,
      };

      // update expression
      const updateParams = {
        TableName: tableName,
        Key: {
          imageDigest: item.imageDigest, // Must match the HASH key defined in the schema
          imageScanCompletedAt: item.imageScanCompletedAt,
        },
        UpdateExpression: `SET 
          imageTag = :imageTag,
          findings = :findings,
          findingSeverityCounts = :findingSeverityCounts,
          vulnerabilitySourceUpdatedAt = :vulnerabilitySourceUpdatedAt,
          scanStatus = :scanStatus,
          scanDescription = :scanDescription,
          registryId = :registryId,
          repositoryName = :repositoryName`,
        ExpressionAttributeValues: {
          ":imageTag": item.imageTag,
          ":findings": item.findings,
          ":findingSeverityCounts": item.findingSeverityCounts,
          ":vulnerabilitySourceUpdatedAt": item.vulnerabilitySourceUpdatedAt,
          ":scanStatus": item.scanStatus,
          ":scanDescription": item.scanDescription,
          ":registryId": item.registryId,
          ":repositoryName": item.repositoryName,
        },
        ReturnValues: "ALL_NEW" as ReturnValue,
      };

      const command = new UpdateCommand(updateParams);
      const updateResponse = await ddbDocClient.send(command);

      console.log("Scan result successfully saved to DynamoDB.");
      return next()
    } catch (error) {
      console.error("Error storing scan result:", error);
      return next(error);
    }
  },
  // Read Scan Result data from
  readScanResultDataFromTable: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tableName = process.env.SCAN_RESULT_TABLE;
      const params = {
        TableName: tableName,
      };
      const command = new ScanCommand(params);
      const data = await ddbDocClient.send(command);
      res.locals.resultDataFromDB = data.Items;

      // Log the message to the console
      const message =
        res.locals.resultDataFromDB.length > 0
          ? "Reading scan result from DB is successful."
          : "Got nothing from ScanResultTable.";
      console.log(message);
      return next();
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },
};

export default dataBaseController;
