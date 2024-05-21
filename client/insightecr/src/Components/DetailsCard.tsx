import React from 'react';
import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import '../App.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import { Repository } from '../utils/types';

function createData(
  critical: number,
  high: number,
  medium: number,
  low: number,
  info: number
) {
  return { critical, high, medium, low, info };
}

const rows = [createData(0, 0, 9, 15, 4)];

interface DetailsCardProps {
  data: Repository;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ data }) => {
  if (!data) {
    return null; // Render nothing if data is undefined
  }
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
      }}
    >
      <CardContent>
        <p id='headerP' style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {data.repositoryName}
        </p>
        <TableContainer id='myTable'>
          <Table sx={{ minWidth: 300, tableLayout:'fixed'}}>
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
                  sx={{}}
                />
              </ListItem>
            </List>

            <Button id='detailsButton' size='small' sx={{ marginTop: 2 }}>
              Details
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
