# FennECR

## Setup

### From Sources

1. Install [Node.js](https://nodejs.org/en/download/package-manager)
2. Run `git clone https://github.com/oslabs-beta/FennECR.git` (or clone [your own fork](https://github.com/oslabs-beta/FennECR/fork) of the repository)
3. Go into the cloned folder with `cd FennECR`
4. Run `cd server && npm install && cd ..` to install server side dependencies
5. Run `cd client/insightecr && npm install && cd ../..` to install client side dependencies
6. Setup environment variables

- 6.1 Create a `.env` file <u>in the root of server folder</u> using below template

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

- 6.2 Replace "your_aws_region", "your_iam_access_key_id", "your_iam_secret_access_key" with your own credentials

7. Run `npm start`
8. Browse to http://localhost:5173

### Docker Container

1. Install Docker⁠
2. Run docker `pull bkimminich/juice-shop`
3. Setup local environment
4. Run docker `run --rm -p 3000:3000 bkimminich/juice-shop`
