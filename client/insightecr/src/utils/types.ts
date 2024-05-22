export interface Repository {
  createdAt: string;
  encryptionConfiguration: { encryptionType: string };
  imageScanningConfiguration: { scanOnPush: boolean };
  imageTagMutability: string;
  registryId: string;
  repositoryArn: string;
  repositoryName: string;
  repositoryUri: string;
}

export interface RepoContextType {
  repositories: Repository[];
  setRepositories: React.Dispatch<React.SetStateAction<Repository[]>>;
}