import * as React from 'react';
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

const defaultTheme = createTheme({
  palette: {
    text: {
      primary: '#21005D',
    },
  },
});

export default function App() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar open={open} toggleDrawer={toggleDrawer} />
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
              {/* other routes here */}
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
