import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import { toggleScanOnPush } from '../utils/api';
import { Repository, SeverityCounts } from '../utils/types';
import { AccountContext } from '../contexts/AccountContext';
import { ThemeContext } from '../App';

interface DetailsCardProps {
  data: Repository;
  severityCounts: SeverityCounts;
  onScanOnPushToggle: (repoName: string, scanOnPush: boolean) => void;
}

const DetailsCard: React.FC<DetailsCardProps> = ({
  data,
  severityCounts,
  onScanOnPushToggle,
}) => {
  // destructure the darkMode value from Context
  const { darkMode } = useContext(ThemeContext);
  // Account Context
  const accountContext = useContext(AccountContext);
  // Check if context is undefined
  if (!accountContext) {
    throw new Error('DetailsCard must be used within an AccountProvider');
  }
  const { accountId } = accountContext;
  const [scanOnPush, setScanOnPush] = useState(
    data.imageScanningConfiguration.scanOnPush
  );

  const handleToggle = async () => {
    try {
      const newScanOnPush = !scanOnPush;
      await toggleScanOnPush(accountId, data.repositoryName, newScanOnPush);
      setScanOnPush(newScanOnPush);
      onScanOnPushToggle(data.repositoryName, newScanOnPush);
    } catch (error) {
      console.error('Error toggling scan on push:', error);
    }
  };

  const navigate = useNavigate();
  const handleDetailsClick = () => {
    navigate(`/repository/${data.repositoryName}`);
  };

  if (!data) {
    return null; // Render nothing if data is undefined
  }

  const rows = [
    {
      critical: severityCounts.critical,
      high: severityCounts.high,
      medium: severityCounts.medium,
      low: severityCounts.low,
      info: severityCounts.informational,
    },
  ];

  return (
    <Card
      id='detailCard1"'
      sx={{
        borderRadius: 7,
        marginBottom: 2,
        minHeight: '360px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: darkMode ? '#45494F' : '#E8DEF8',
      }}
    >
      <CardContent
        id='cardContent"'
        sx={{
          borderRadius: 7,
          marginBottom: 2,
          minHeight: '360px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <p id='headerP' style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {data.repositoryName}
        </p>
        <TableContainer id='myTable'>
          <Table sx={{ minWidth: 300, tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Critical</TableCell>
                <TableCell align='center'>High</TableCell>
                <TableCell align='center'>Medium</TableCell>
                <TableCell align='center'>Low</TableCell>
                <TableCell align='center'>Info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((level) => (
                <TableRow key={level.critical}>
                  <TableCell align='center'>{level.critical}</TableCell>
                  <TableCell align='center'>{level.high}</TableCell>
                  <TableCell align='center'>{level.medium}</TableCell>
                  <TableCell align='center'>{level.low}</TableCell>
                  <TableCell align='center'>{level.info}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List>
              <ListItem>
                <ListItemText
                  primary='Created At'
                  secondary={new Date(data.createdAt).toLocaleString()}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary='Tag immutability'
                  secondary={
                    data.imageTagMutability === 'IMMUTABLE'
                      ? 'Enabled'
                      : 'Disabled'
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary='Scan frequency'
                  secondary={
                    data.imageScanningConfiguration.scanOnPush
                      ? 'Scan on Push'
                      : 'Manual Scan'
                  }
                />
                <Switch
                  id='scanOnPushSwitch'
                  checked={data.imageScanningConfiguration.scanOnPush}
                  onChange={handleToggle}
                  sx={{}}
                />
              </ListItem>
            </List>
            <Button
              id='detailsButton'
              size='small'
              sx={{ marginTop: 2 }}
              onClick={handleDetailsClick}
            >
              Details
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
