import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PublicIcon from '@mui/icons-material/Public';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import EqualizerSharpIcon from '@mui/icons-material/EqualizerSharp';
import { Divider, ListSubheader } from '@mui/material';
import { Repository } from '../utils/types';
import { AccountContext } from '../contexts/AccountContext';
import { ThemeContext } from '../App';

interface ListItemsProps {
  repo: Repository[];
  onRepoClick: (repoName: string) => void;
}

const ListItems: React.FC<ListItemsProps> = ({ repo, onRepoClick }) => {
  const { darkMode } = useContext(ThemeContext);
  // Account Context
  const accountContext = useContext(AccountContext);
  // Check if context is undefined
  if (!accountContext) {
    throw new Error('ListItem must be used within an AccountProvider');
  }
  const { accountId } = accountContext;
  return (
    <React.Fragment>
      <ListSubheader
        component='div'
        inset
        sx={{ backgroundColor: darkMode ? '#292929' : '#E8DEF8' }}
      >
        Dashboard
      </ListSubheader>
      <ListItemButton component={Link} to='/'>
        <ListItemIcon>
          <EqualizerSharpIcon
            sx={{ color: darkMode ? '#EADDFF' : '#21005D' }}
          />
        </ListItemIcon>
        <ListItemText primary='Stats' />
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      <ListSubheader
        component='div'
        inset
        sx={{ backgroundColor: darkMode ? '#292929' : '#E8DEF8' }}
      >
        {`AWS Account - ${accountId}`}
      </ListSubheader>
      {repo.map((repo) => (
        <ListItemButton
          key={repo.repositoryName}
          component={Link}
          to={`/repository/${repo.repositoryName}`}
          onClick={() => onRepoClick(repo.repositoryName)}
        >
          <ListItemIcon>
            <PublicIcon sx={{ color: darkMode ? '#EADDFF' : '#21005D' }} />
          </ListItemIcon>
          <ListItemText primary={repo.repositoryName} />
        </ListItemButton>
      ))}
      <Divider sx={{ my: 1 }} />
      <ListSubheader
        component='div'
        inset
        sx={{ backgroundColor: darkMode ? '#292929' : '#E8DEF8' }}
      >
        Others
      </ListSubheader>
      <ListItemButton
        component='a'
        href='https://github.com/oslabs-beta/FennECR'
        target='_blank'
        rel='noopener noreferrer'
      >
        <ListItemIcon>
          <DescriptionIcon sx={{ color: darkMode ? '#EADDFF' : '#21005D' }} />
        </ListItemIcon>
        <ListItemText primary='Documentation' />
      </ListItemButton>
      <ListItemButton component='a' href='https://fennecr.com/' target='_blank'>
        <ListItemIcon>
          <EmailIcon sx={{ color: darkMode ? '#EADDFF' : '#21005D' }} />
        </ListItemIcon>
        <ListItemText primary='Contact Us' />
      </ListItemButton>
    </React.Fragment>
  );
};

export default ListItems;
