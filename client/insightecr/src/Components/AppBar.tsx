import * as React from 'react';
import { styled, Typography, Toolbar, IconButton } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps{
  open: boolean;
  toggleDrawer: () => void;
}

const AppBarStyle = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: 'white',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar: React.FC<AppBarProps> = ({ open, toggleDrawer }) => {
  return (
    <AppBarStyle position='absolute' open={open}>
      <Toolbar sx={{ pr: '24px' }}>
        <IconButton
          edge='start'
          aria-label='open drawer'
          onClick={toggleDrawer}
          sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component='h1'
          variant='h6'
          color='#21005D'
          noWrap
          sx={{ flexGrow: 1, textAlign: 'center'  }}
        >
          InSightECR
        </Typography>
      </Toolbar>
    </AppBarStyle>
  );
};

export default AppBar;
