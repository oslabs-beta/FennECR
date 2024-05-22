import React, { useContext } from 'react';
import { styled ,Divider, Toolbar,IconButton,List } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { RepoContext } from '../contexts/RepoContext.tsx';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItems from './ListItems.tsx';

const drawerWidth: number = 240;

interface DrawerProps {
  open?: boolean;
  toggleDrawer: () => void;
}

const DrawerStyle = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    background: '#D1D0FB',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const NavDrawer:React.FC<DrawerProps> = ({ open, toggleDrawer }) => {
  const { repositories } = useContext(RepoContext)
  return (
    <DrawerStyle variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItems repo={repositories}/>
          </List>
        </DrawerStyle>
  );
};

export default NavDrawer