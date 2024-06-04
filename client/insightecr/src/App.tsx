import React, { createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Toolbar,
} from '@mui/material';
import AppBar from './Components/AppBar';
import NavDrawer from './Components/NavDrawer';
import Dashboard from './Pages/Dashboard';
import RepoPage from './Pages/Repository';

// Define the ThemeContext
export const ThemeContext = createContext({ darkMode: false });

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#21005D',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: '#EADDFF',
    },
    background: {
      default: '#121212',
    },
  },
});

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode }}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Router>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
              open={open}
              toggleDrawer={toggleDrawer}
              darkMode={darkMode}
              handleThemeChange={handleThemeChange}
            />
            <NavDrawer open={open} toggleDrawer={toggleDrawer} />
            <Box
              component='main'
              sx={{
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
            >
              <Toolbar />
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/repository/:repoName' element={<RepoPage />} />
                {/* other routes here */}
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
