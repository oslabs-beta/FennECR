// contexts/RepoContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllRepositories } from '../utils/api';
import { AccountContext } from './AccountContext';
import { Repository, RepoContextType } from '../utils/types';

const defaultRepoContext: RepoContextType = {
  repositories: [],
  setRepositories: () => {},
  selectedRepository: null,
  setSelectedRepository: () => {},
};

export const RepoContext = createContext<RepoContextType>(defaultRepoContext);

const RepoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepository, setSelectedRepository] = useState<string | null>(null);
  const accountId = useContext(AccountContext);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const data = await getAllRepositories(accountId);
        setRepositories(data.repositories);
      } catch (error) {
        console.error('Error fetching repositories data:', error);
      }
    };

    fetchRepoData();
  }, [accountId]);

  return (
    <RepoContext.Provider value={{ repositories, setRepositories, selectedRepository, setSelectedRepository }}>
      {children}
    </RepoContext.Provider>
  );
};

export default RepoProvider;