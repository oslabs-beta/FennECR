import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NavDrawer from './NavigationDrawer'; // Import your NavDrawer component

const NavBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* NavigationDrawer Icon */}
        <IconButton edge="start" color="inherit" aria-label="menu">
        <NavDrawer />
        </IconButton>
        {/* Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          InSightECR
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;