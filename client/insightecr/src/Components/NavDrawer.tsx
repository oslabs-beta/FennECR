import React, { useContext } from 'react';
import { styled, Divider, Toolbar, IconButton, List } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { RepoContext } from '../contexts/RepoContext.tsx';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItems from './listItems.tsx';
import { ThemeContext } from '../App';

const drawerWidth: number = 240;

interface DrawerProps {
  open?: boolean;
  toggleDrawer: () => void;
  darkMode?: boolean;
}

const DrawerStyle = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'darkMode',
})<{ open?: boolean; darkMode?: boolean }>(({ theme, open, darkMode }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    background: darkMode ? '#292929' : '#E8DEF8',
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

const NavDrawer: React.FC<DrawerProps> = ({ open, toggleDrawer }) => {
  const { repositories, setSelectedRepository } = useContext(RepoContext);
  const { darkMode } = useContext(ThemeContext);
  const handleRepoClick = (repoName: string) => {
    setSelectedRepository(repoName);
    toggleDrawer();
  };
  return (
    <DrawerStyle variant='permanent' open={open} darkMode={darkMode}>
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
      <List component='nav'>
        <ListItems repo={repositories} onRepoClick={handleRepoClick} />
      </List>
    </DrawerStyle>
  );
};

export default NavDrawer;
