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
  selectedRepository: string | null;
  setSelectedRepository: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface Image {
  imageTags: string[];
  imageSizeInBytes: number;
  imageScanStatus: {
    status: string;
  };
  imagePushedAt: string;
  imageScanFindingsSummary: {
    findingSeverityCounts: {
      CRITICAL: number;
      HIGH: number;
      MEDIUM: number;
      LOW: number;
      INFORMATIONAL: number;
    };
  };
}

export interface SeverityCounts {
  critical: number;
  high: number;
  medium: number;
  low: number;
  informational: number;
}

export interface SeverityCountsMap {
  [key: string]: SeverityCounts;
}

export interface AccountContextProps {
  accountId: string;
  setAccountId: (accountId: string) => void;
  accounts: { accountId: string }[];
}

export interface Finding {
  id: string;
  name: string;
  package: string;
  description: string;
  severity: string;
  uri: string;
}

export interface ImageAttribute {
  key: string;
  value: string;
}

export interface ImageFinding {
  description: string;
  severity: string;
  uri: string;
  attributes: ImageAttribute[];
}

export interface ImageScanResult {
  imageScanFindings: {
    findings: ImageFinding[];
  };
}
