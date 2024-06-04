"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const dynamoDB_1 = __importDefault(require("../models/dynamoDB"));
// Helper function to convert Date objects to ISO strings in an object
const convertDatesToISOString = (obj) => {
    for (const key in obj) {
        if (obj[key] instanceof Date) {
            obj[key] = obj[key].toISOString();
        }
        else if (typeof obj[key] === "object" && obj[key] !== null) {
            convertDatesToISOString(obj[key]);
        }
    }
};
const dataBaseController = {
    storeImageDetails: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Read the table name from the env config file.
        const tableName = process.env.IMAGES_TABLE_NAME;
        const input = {
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
            const describeTableCommand = new client_dynamodb_1.DescribeTableCommand({
                TableName: tableName,
            });
            yield dynamoDB_1.default.send(describeTableCommand);
            console.log("Images table already exists. Skipping creation.");
        }
        catch (error) {
            if (error.name === "ResourceNotFoundException") {
                // If the table does not exist, create it
                console.log("ImagesTable does not exist. Creating table...");
                const createTableCommand = new client_dynamodb_1.CreateTableCommand(input);
                const createTableResponse = yield dynamoDB_1.default.send(createTableCommand);
                console.log(createTableResponse);
            }
            else {
                console.error("Error checking table existence:", error);
                return next(error);
            }
        }
        // Write data to database logic
        try {
            console.log('res.locals.images from storeImageDetails:', res.locals.images);
            // Make sure the images is an array
            const images = res.locals.images;
            if (!Array.isArray(images)) {
                throw new TypeError("res.locals.images is not an array");
            }
            // Convert the date to ISOString
            images.forEach(convertDatesToISOString);
            for (const image of images) {
                const putParams = {
                    TableName: tableName,
                    Item: image,
                };
                yield dynamoDB_1.default.send(new lib_dynamodb_1.PutCommand(putParams));
            }
            res
                .status(200)
                .json({ message: "Images successfully saved to dynamoDB." });
        }
        catch (error) {
            console.error("Error storing images:", error);
            return next(error);
        }
    }),
    // Read images detail data from dynamoDB
    readImageDataFromTable: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tableName = process.env.IMAGES_TABLE_NAME;
            const params = {
                TableName: tableName,
            };
            const command = new lib_dynamodb_1.ScanCommand(params);
            const data = yield dynamoDB_1.default.send(command);
            res.locals.imgDataFromDB = data.Items;
            next();
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    }),
    // storeScanResultData function
    storeScanResultData: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const scanResults = res.locals.singleScanResult;
        const tableName = process.env.SCAN_RESULT_TABLE;
        // Define the table schema
        const input = {
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
            const describeTableCommand = new client_dynamodb_1.DescribeTableCommand({
                TableName: tableName,
            });
            yield dynamoDB_1.default.send(describeTableCommand);
            console.log("Scan result table already exists. Skipping creation.");
        }
        catch (error) {
            if (error.name === "ResourceNotFoundException") {
                console.log("SingleScanResult table does not exist. Creating table...");
                const createTableCommand = new client_dynamodb_1.CreateTableCommand(input);
                const createTableResponse = yield dynamoDB_1.default.send(createTableCommand);
            }
            else {
                console.error("Error checking table existence:", error);
                return next(error);
            }
        }
        // Update the scan result data
        try {
            const { imageId, imageScanFindings, registryId, repositoryName, imageScanStatus, } = scanResults;
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
                ReturnValues: "ALL_NEW",
            };
            const command = new lib_dynamodb_1.UpdateCommand(updateParams);
            const updateResponse = yield dynamoDB_1.default.send(command);
            res.status(200).json({
                message: "Scan result successfully saved to DynamoDB.",
                data: updateResponse.Attributes,
            });
            console.log("Scan result successfully saved to DynamoDB.");
        }
        catch (error) {
            // Refactor: send this to global error handler
            console.error("Error storing scan result:", error);
            return next(error);
        }
    }),
    // Read Scan Result data from
    readScanResultDataFromTable: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tableName = process.env.SCAN_RESULT_TABLE;
            const params = {
                TableName: tableName,
            };
            const command = new lib_dynamodb_1.ScanCommand(params);
            const data = yield dynamoDB_1.default.send(command);
            res.locals.resultDataFromDB = data.Items;
            // Log the message to the console
            const message = res.locals.resultDataFromDB.length > 0
                ? "Reading scan result from DB is successful."
                : "Got nothing from ScanResultTable.";
            console.log(message);
            next();
        }
        catch (error) {
            console.log(error);
            return next(error);
        }
    }),
};
exports.default = dataBaseController;
