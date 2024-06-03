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

const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accountId, setAccountId] = useState<string>('');
  const [accounts, setAccounts] = useState<{ accountId: string }[]>([]);

  useEffect(() => {
    const fetchAccountId = async () => {
      try {
        const data = await getAccountId();
        console.log('Fetched account data:', data);
        setAccounts(data);
        if (data.length > 0) {
          console.log(`I am default accountId: ${data[0].accountId}`);
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
