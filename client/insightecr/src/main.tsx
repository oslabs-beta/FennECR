//import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AccountContext } from './contexts/AccountContext.tsx';
import RepoProvider from './contexts/RepoContext.tsx';
//import './index.css'

const accountId = '1'; // Hardcoded account ID for now
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode> //Diabled StrictMode for now - it is sending two fetch request
  <AccountContext.Provider value={accountId}>
    <RepoProvider>
      <App />
    </RepoProvider>
  </AccountContext.Provider>
);
// </React.StrictMode>
