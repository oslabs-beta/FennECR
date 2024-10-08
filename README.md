# FennECR

- [Summary](#summary)
- [Key Features](#key-features-of-fennecr)
- [Setup for docker image version](#docker-container)
- [Setup for source version](#from-sources)
- [Meet the team](#the-fennecr-team)

## Summary

![](https://github.com/oslabs-beta/FennECR/blob/main/client/insightecr/Public/FennecrBanner.png?raw=true)

FennECR tracks and organizes vulnerability scans performed by AWS ECR, and provides a user-friendly interface to manage and respond to security findings effectively.

## Key Features of FennECR

#### a. Centralized Dashboard:

A basic yet powerful dashboard that displays scan results in a unified view, as depicted in this demo.
![](https://github.com/oslabs-beta/FennECR/blob/main/client/insightecr/Public/DashboardDemo.gif?raw=true)
Detailed insights into the security status and vulnerability details of your container images, as shown in this demo.
![](https://github.com/oslabs-beta/FennECR/blob/main/client/insightecr/Public/RepoAndImagDetailsDemo.gif?raw=true)
Easily toggle scan-on-push settings for your repositories directly from our interface, enhancing your workflow as demonstrated in this demo.
![](https://github.com/oslabs-beta/FennECR/blob/main/client/insightecr/Public/ScanOnPushDemo.gif?raw=true)

#### b. Local Environment Variable Integration

Secure Credential Management: Your credentials remain under your control. Security is our utmost priority, your local environment variables are managed with the highest level of security on your local environment.

#### c. Multi-Access Key Support

Are you managing multiple AWS accounts? FennECR seamlessly supports multi access keys, allowing you to track and manage vulnerabilities across various accounts with ease, as demonstrated in this demo.
![](https://github.com/oslabs-beta/FennECR/blob/main/client/insightecr/Public/AccountSwitchingDemo.gif?raw=true)

#### d. Historical scan results secured in DynamoDB

Need to review past scan results? FennECR securely stores historical data in DynamoDB, making accessing and analyzing previous scan outcomes easy.

#### e. Dark Mode

Enjoy the flexibility of dark mode, designed to reduce eye strain and provide a visually pleasing interface for users who prefer a darker theme, as illustrated in this demo.
![](https://github.com/oslabs-beta/FennECR/blob/main/client/insightecr/Public/DarkModeDemo.gif?raw=true)

## Setup

### Docker Container

1. Install [docker](https://www.docker.com/)
2. Create a folder for the app `mkdir FennECR`
3. Go to the folder you just created `cd FennECR`
4. Create Docker compose file(run `touch docker-compose.yml` and paste in the below template or [download](https://github.com/oslabs-beta/FennECR/raw/main/docker-compose.yml) here and put in the same folder)

- docker-compose.yml template

```yml
version: '3.8'

services:
  client:
    image: fennecr/insightecr-client
    ports:
      - '80:80'
    depends_on:
      - server
    env_file:
      - .env
    networks:
      - insightecr-network

  server:
    image: fennecr/insightecr-server
    ports:
      - '3000:3000'
    container_name: insightecr-server-1
    depends_on:
      - dynamodb
    env_file:
      - .env
    networks:
      - insightecr-network

  dynamodb:
    image: amazon/dynamodb-local
    container_name: dynamodb
    ports:
      - '8000:8000'
    volumes:
      - dynamodbdata:/data
    env_file:
      - .env
    networks:
      - insightecr-network

volumes:
  dynamodbdata:

networks:
  insightecr-network:
    driver: bridge
```

5. Setup environment variables

- &nbsp; 5.1 Create a `.env` file <strong><u>in the same folder</u></strong> using below template

  ```sh
  # AWS Credentials for Development Environment
  AWS_REGION_DEV="your_aws_region"
  AWS_ACCESS_KEY_ID_DEV="your_iam_access_key_id"
  AWS_SECRET_ACCESS_KEY_DEV="your_iam_secret_access_key"

  # AWS Credentials for Production Environment(e.g., for other aws roles or accounts, you can replace DEV or PROD with other string)
  AWS_REGION_PROD="your_aws_region"
  AWS_ACCESS_KEY_ID_PROD="your_iam_access_key_id"
  AWS_SECRET_ACCESS_KEY_PROD="your_iam_secret_access_key"

  # DynamoDB Configuration
  DYNAMODB_TABLE_NAME="ImagesTable"
  SCAN_RESULT_TABLE="SingleScanResult"
  DYNAMODB_ACCESS_KEY_ID="local"
  DYNAMODB_SECRET_ACCESS_KEY="local"

  # Use "http://localhost:8000" when running on localhost
  # Use "http://dynamodb:8000" when running the docker version
  DYNAMODB_ENDPOINT="http://dynamodb:8000"
  ```

- &nbsp; 5.2 Replace "your_aws_region", "your_iam_access_key_id", "your_iam_secret_access_key" with your own credentials

6. Run `docker-compose up`
7. Browse to http://localhost

### From Sources

1. Install [Node.js](https://nodejs.org/en/download/package-manager)
2. Run `git clone https://github.com/oslabs-beta/FennECR.git` (or clone [your own fork](https://github.com/oslabs-beta/FennECR/fork) of the repository)
3. Go into the cloned folder with `cd FennECR`
4. Run `npm install` to install dependencies in the root folder
5. Run `cd server && npm install && cd ..` to install server side dependencies
6. Run `cd client/insightecr && npm install && cd ../..` to install client side dependencies
7. Setup DynamoDB local

- &nbsp; 7.1 Install [docker](https://www.docker.com/)
- &nbsp; 7.2 Pull the DynamoDB docker image from docker Hub ` docker pull amazon/dynamodb-local`
- &nbsp; 7.3 Run the image `docker run -p 8000:8000 amazon/dynamodb-local` and keep the terminal open

8. Setup environment variables

- &nbsp; 8.1 Create a `.env` file <strong><u>in the root of server folder</u></strong> using below template

  ```sh
  # AWS Credentials for Development Environment
  AWS_REGION_DEV="your_aws_region"
  AWS_ACCESS_KEY_ID_DEV="your_iam_access_key_id"
  AWS_SECRET_ACCESS_KEY_DEV="your_iam_secret_access_key"

  # AWS Credentials for Production Environment(e.g., for other aws roles or accounts, you can replace DEV or PROD with other string)
  AWS_REGION_PROD="your_aws_region"
  AWS_ACCESS_KEY_ID_PROD="your_iam_access_key_id"
  AWS_SECRET_ACCESS_KEY_PROD="your_iam_secret_access_key"

  # DynamoDB Configuration
  DYNAMODB_TABLE_NAME="ImagesTable"
  SCAN_RESULT_TABLE="SingleScanResult"
  DYNAMODB_ACCESS_KEY_ID="local"
  DYNAMODB_SECRET_ACCESS_KEY="local"

  # Use "http://localhost:8000" when running on localhost
  # Use "http://dynamodb:8000" when running the docker version
  DYNAMODB_ENDPOINT="http://localhost:8000"
  ```

- &nbsp; 8.2 Replace "your_aws_region", "your_iam_access_key_id", "your_iam_secret_access_key" with your own credentials

9. Run `npm start`
10. Browse to http://localhost

## The FennECR Team

|     Developed By     |                                                                                                                                               |                                                                                                                                               |
| :------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: |
|       Cyane Li       |   [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/CyaneL)   |      [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/q-li/)      |
|       Jing Xia       |   [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jxia03)   |    [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jingxia03)    |
| Ricardo De los Reyes |  [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rickyd88)  |   [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ricardodlr)    |
|    Richard Araujo    |   [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rcad14)   | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/richard-araujo/) |
|      Peter Gao       | [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/petergaoxl) |  [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/xiaolei-gao/)   |
