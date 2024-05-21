import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AccountContext } from './contexts/AccountContext.tsx';
//import './index.css'

const accountId = '1'; // Hardcoded account ID for now
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AccountContext.Provider value ={accountId}>
    <App />
    </AccountContext.Provider>
  </React.StrictMode>,
)
