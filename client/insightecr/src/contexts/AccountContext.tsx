import React, { createContext, useState, useEffect } from 'react';
import { AccountContextProps } from '../utils/types';
import { getAccountId } from '../utils/api';

const AccountContext = createContext<AccountContextProps | undefined>(
  undefined
);

const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accountId, setAccountId] = useState<string>('');
  const [accounts, setAccounts] = useState<{ accountId: string }[]>([]);

  useEffect(() => {
    const fetchAccountId = async () => {
      try {
        const data = await getAccountId();
        setAccounts(data);
        if (data.length > 0) {
          setAccountId(data[0].accountId); // Set default accountId to the first account
        }
      } catch (error) {
        console.error('Error fetching account ID:', error);
      }
    };

    fetchAccountId();
  }, []);

  return (
    <AccountContext.Provider value={{ accountId, setAccountId, accounts }}>
      {children}
    </AccountContext.Provider>
  );
};

export { AccountContext, AccountProvider };
