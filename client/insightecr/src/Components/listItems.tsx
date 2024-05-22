import React, { useContext } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PublicIcon from '@mui/icons-material/Public';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import InsightsSharpIcon from '@mui/icons-material/InsightsSharp';
import EqualizerSharpIcon from '@mui/icons-material/EqualizerSharp';
import { Divider, ListSubheader } from '@mui/material';
import { Repository } from '../utils/types';
import { AccountContext } from '../contexts/AccountContext.tsx';

interface ListItemsProps {
  repo: Repository[];
}

const ListItems: React.FC<ListItemsProps> = ({ repo }) => {
  const accountId = useContext(AccountContext);
  return (
    <React.Fragment>
      <ListSubheader component='div' inset sx={{ backgroundColor: '#D1D0FB' }}>
        Dashboard
      </ListSubheader>
      <ListItemButton>
        <ListItemIcon>
          <EqualizerSharpIcon />
        </ListItemIcon>
        <ListItemText primary='Stats' />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <InsightsSharpIcon />
        </ListItemIcon>
        <ListItemText primary='Trends' />
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      <ListSubheader component='div' inset sx={{ backgroundColor: '#D1D0FB' }}>
        {`AWS Account - ${accountId}`}
      </ListSubheader>
      {repo.map((repo) => (
        <ListItemButton>
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary={repo.repositoryName} />
        </ListItemButton>
      ))}
      <Divider sx={{ my: 1 }} />
      <ListSubheader component='div' inset sx={{ backgroundColor: '#D1D0FB' }}>
        Tools
      </ListSubheader>
      <ListItemButton>
        <ListItemIcon>
          <NotificationsActiveIcon />
        </ListItemIcon>
        <ListItemText primary='Alert' />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary='Documentation' />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText primary='Contact Us' />
      </ListItemButton>
    </React.Fragment>
  );
};

export default ListItems;
