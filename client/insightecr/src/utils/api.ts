import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Backend port

export const getAccountId = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/accounts`);
    return response.data.accounts;
  } catch (error) {
    console.error('Error fetching accounts data:', error);
    return [];
  }
};

export const getRepositoryData = async (
  accountId: string,
  repoName: string
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/repository/${accountId}/${repoName}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching repository data:', error);
  }
};

export const getAllRepositories = async (accountId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/repository/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all repositories data:', error);
  }
};

export const toggleScanOnPush = async (
  accountId: string,
  repoName: string,
  scanOnPush: boolean
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/repository/${accountId}/${repoName}/scan-on-push`,
      {
        scanOnPush,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error toggling scan on push:', error);
  }
};

export const getAggregatedScanResults = async (
  accountId: string,
  repoName: string
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/results/${accountId}/${repoName}`
    );
    return response.data;
  } catch (error) {
    const typedError = error as Error;

    if (typedError.message && typedError.message === '404') {
      // Handle 404 not found
      console.warn(`Data not found for repository ${repoName}`);
      return null;
    } else {
      console.error(
        'Error fetching aggregated results from given repository:',
        error
      );
    }
  }
};

export const getImages = async (accountId: string, repoName: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/images/${accountId}/${repoName}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching repository data:', error);
  }
};

export const getSingleScanResults = async (
  accountId: string,
  repoName: string,
  imageTag: string
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/results/${accountId}/${repoName}/${imageTag}`
    );
    return response.data;
  } catch (error) {
    const typedError = error as Error;

    if (typedError.message && typedError.message === '404') {
      // Handle 404 not found
      console.warn(
        `Data not found for repository ${repoName} image ${imageTag}`
      );
      return null;
    } else {
      console.error(
        'Error fetching image scan results from given repository:',
        error
      );
    }
  }
};
