/**
 * @see https://react.dev/learn/passing-data-deeply-with-context
 */

import React, { createContext, useState } from 'react';

// Set up a drop down menu for user to select accounts dynamically
interface AccountContextProps {
  accountId: string;
  setAccountId: (accountId: string) => void;
}

const AccountContext = createContext<AccountContextProps| undefined>(undefined);

const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accountId, setAccountId] = useState<string>('');

  return (
    <AccountContext.Provider value={{ accountId, setAccountId }}>
      {children}
    </AccountContext.Provider>
  );
};

export { AccountContext, AccountProvider };