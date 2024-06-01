//import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AccountProvider } from './contexts/AccountContext.tsx';
import RepoProvider from './contexts/RepoContext.tsx';
//import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode> //Diabled StrictMode for now - it is sending two fetch request
  <AccountProvider>
    <RepoProvider>
      <App />
    </RepoProvider>
  </AccountProvider>
);
// </React.StrictMode>
