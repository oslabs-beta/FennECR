import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AccountProvider } from './contexts/AccountContext';
import RepoProvider from './contexts/RepoContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AccountProvider>
      <RepoProvider>
        <App />
      </RepoProvider>
    </AccountProvider>
  </React.StrictMode>
);
