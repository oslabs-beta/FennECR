import * as React from 'react';
import { useContext } from 'react';
import {
  styled,
  Typography,
  Toolbar,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  Box,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountContext } from '../contexts/AccountContext';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
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
  // Account Context
  const accountContext = useContext(AccountContext);
  // Check if context is undefined
  if (!accountContext) {
    throw new Error('Dashboard must be used within an AccountProvider');
  }
  const { accountId, setAccountId, accounts } = accountContext;

  // Handle dropdown menu select
  const handleChange = (event: SelectChangeEvent<string>) => {
    setAccountId(event.target.value);
  };

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
          sx={{ flexGrow: 1, textAlign: 'center' }}
        >
          FennECR
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='body1' color='#21005D' sx={{ mr: 2 }}>
            Current Account:
          </Typography>
          <FormControl variant='outlined' size='small'>
            <Select value={accountId} onChange={handleChange} displayEmpty>
              {accounts.map((account, index) => (
                <MenuItem key={index} value={account.accountId}>
                  {account.accountId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBarStyle>
  );
};

export default AppBar;
