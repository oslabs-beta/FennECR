/**
 * @see https://react.dev/learn/passing-data-deeply-with-context
 */

import React, { createContext, useState, useEffect } from 'react';
import { AccountContextProps } from '../utils/types';
import { getAccountId } from '../utils/api';

// Set up a drop down menu for user to select accounts dynamically
const AccountContext = createContext<AccountContextProps | undefined>(
  undefined
);

const AccountProvider: React.FC<{ children: React.ReactNode}> = ({
  children, 
}) => {
  const [accountId, setAccountId] = useState<string>('');
  const [accounts, setAccounts] = useState<{ id: string }[]>([]);

  useEffect(() => {
    const fetchAccountId = async () => {
      try {
        const data = await getAccountId();
        setAccounts([data]);
        setAccountId(data.accountId);
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
