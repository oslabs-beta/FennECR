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
const dataBaseController = {
    storeImageDetails: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Checking session data in storeImageDetails:", req.session.images);
        if (!req.session.images || !req.session.images.imageDetails) {
            return res.status(400).json({ error: "No image details found to store" });
        }
        // Read the table name from the env config file.
        const tableName = process.env.DYNAMODB_TABLE_NAME;
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
            console.log("Table already exists. Skipping creation.");
        }
        catch (error) {
            if (error.name === "ResourceNotFoundException") {
                // If the table does not exist, create it
                console.log("Table does not exist. Creating table...");
                const createTableCommand = new client_dynamodb_1.CreateTableCommand(input);
                const createTableResponse = yield dynamoDB_1.default.send(createTableCommand);
                console.log("Table creation response:", createTableResponse);
            }
            else {
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
                yield dynamoDB_1.default.send(new lib_dynamodb_1.PutCommand(putParams));
            }
            res.status(200).json({ message: "Images successfully saved to dynamoDB." });
        }
        catch (error) {
            console.error("Error storing images:", error);
            res.status(500).json({ error: "Could not store images" });
        }
    }),
    // Read data from dynamoDB
    scanTable: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tableName = process.env.DYNAMODB_TABLE_NAME;
            const params = {
                TableName: tableName,
            };
            const command = new lib_dynamodb_1.ScanCommand(params);
            const data = yield dynamoDB_1.default.send(command);
            console.log('Data from scan table: ', data);
            res.locals.dynamoDBdata = data.Items;
            next();
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error occurs when scan table." });
        }
    })
};
exports.default = dataBaseController;
