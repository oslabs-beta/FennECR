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


export interface Image {
  
  imageDetails: {
    imageTags: string[];
    imageSizeInBytes: number;
    imageScanStatus: {
      status:string;
    };
    imagePushedAt: string;
    imageScanFindingsSummary: {
      findingSeverityCounts:{
        CRITICAL: number,
        HIGH: number,
        MEDIUM: number,
        LOW: number
        INFORMATIONAL: number,
      }
    }
  }
}
export type SeverityCounts = {
  critical: number;
  high: number;
  medium: number;
  low: number;
  informational: number;
};

export type SeverityCountsMap = {
  [key: string]: SeverityCounts;
};
