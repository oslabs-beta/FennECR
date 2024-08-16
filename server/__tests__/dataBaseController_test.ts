import { Request, Response, NextFunction } from 'express';
import { mockClient } from 'aws-sdk-client-mock';
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import {
  CreateTableCommand,
  DescribeTableCommand,
} from '@aws-sdk/client-dynamodb';
import dataBaseController from '../src/controllers/dataBaseController';

// Mock the DynamoDB document client
const ddbMock = mockClient(DynamoDBDocumentClient);

describe('dataBaseController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      locals: {},
    };
    jest.resetAllMocks();
    ddbMock.reset();
  });

  describe('storeImageDetails', () => {
    it('should create table if it does not exist and store image details', async () => {
      // Mock DescribeTableCommand to throw ResourceNotFoundException
      ddbMock
        .on(DescribeTableCommand)
        .rejects({ name: 'ResourceNotFoundException' });

      // Mock successful table creation
      ddbMock.on(CreateTableCommand).resolves({});

      // Mock successful PutCommand
      ddbMock.on(PutCommand).resolves({});

      mockResponse.locals = {
        images: [{ imageDigest: 'test-digest', testData: 'test-data' }],
      };

      await dataBaseController.storeImageDetails(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(ddbMock.calls()).toHaveLength(3); // DescribeTableCommand, CreateTableCommand, PutCommand
      expect(nextFunction).toHaveBeenCalledWith();
    });

    it('should handle errors when storing image details', async () => {
      ddbMock.on(DescribeTableCommand).rejects(new Error('Test error'));

      await dataBaseController.storeImageDetails(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          log: expect.stringContaining(
            'Error in dataBaseController.storeImageDetails'
          ),
          status: 500,
          message: 'Error checking table existence',
        })
      );
    });
  });

  describe('readImageDataFromTable', () => {
    it('should read image data from the table', async () => {
      const mockItems = [{ imageDigest: 'test-digest', testData: 'test-data' }];
      ddbMock.on(ScanCommand).resolves({ Items: mockItems });

      mockResponse.locals = {};

      await dataBaseController.readImageDataFromTable(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.locals.imgDataFromDB).toEqual(mockItems);
      expect(nextFunction).toHaveBeenCalledWith();
    });

    it('should handle errors when reading image data', async () => {
      ddbMock.on(ScanCommand).rejects(new Error('Test error'));

      await dataBaseController.readImageDataFromTable(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          log: expect.stringContaining(
            'Error in dataBaseController.readImageDataFromTable'
          ),
          status: 500,
          message: 'Error reading image details from db table',
        })
      );
    });
  });

  describe('storeScanResultData', () => {
    it('should create table if it does not exist and store scan result data', async () => {
      // Mock DescribeTableCommand to throw ResourceNotFoundException
      ddbMock
        .on(DescribeTableCommand)
        .rejects({ name: 'ResourceNotFoundException' });

      // Mock successful table creation
      ddbMock.on(CreateTableCommand).resolves({});

      // Mock successful UpdateCommand
      ddbMock.on(UpdateCommand).resolves({});

      mockResponse.locals = {
        singleScanResult: {
          imageId: { imageDigest: 'test-digest', imageTag: 'test-tag' },
          imageScanFindings: {
            findings: [],
            findingSeverityCounts: {},
            imageScanCompletedAt: new Date().toISOString(),
            vulnerabilitySourceUpdatedAt: new Date().toISOString(),
          },
          imageScanStatus: {
            status: 'COMPLETE',
            description: 'Scan completed',
          },
          registryId: 'test-registry',
          repositoryName: 'test-repo',
        },
      };

      await dataBaseController.storeScanResultData(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(ddbMock.calls()).toHaveLength(3); // DescribeTableCommand, CreateTableCommand, UpdateCommand
      expect(nextFunction).toHaveBeenCalledWith();
    });

    it('should handle errors when storing scan result data', async () => {
      ddbMock.on(DescribeTableCommand).rejects(new Error('Test error'));

      await dataBaseController.storeScanResultData(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          log: expect.stringContaining(
            'Error in dataBaseController.storeScanResultData'
          ),
          status: 500,
          message: 'Error checking table existence',
        })
      );
    });
  });

  describe('readScanResultDataFromTable', () => {
    it('should read scan result data from the table', async () => {
      const mockItems = [
        {
          imageDigest: 'test-digest',
          imageScanCompletedAt: new Date().toISOString(),
          findings: [],
          findingSeverityCounts: {},
        },
      ];
      ddbMock.on(ScanCommand).resolves({ Items: mockItems });

      mockResponse.locals = {};

      await dataBaseController.readScanResultDataFromTable(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.locals.resultDataFromDB).toEqual(mockItems);
      expect(nextFunction).toHaveBeenCalledWith();
    });

    it('should handle errors when reading scan result data', async () => {
      ddbMock.on(ScanCommand).rejects(new Error('Test error'));

      await dataBaseController.readScanResultDataFromTable(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          log: expect.stringContaining(
            'Error in dataBaseController.readScanResultDataFromTable'
          ),
          status: 500,
          message: 'Error reading scan result',
        })
      );
    });
  });
});
