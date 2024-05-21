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

const DetailsCard = () => {
  return (
    <Card id='detailCard1"' sx={{ borderRadius: 7 }}>
      <CardContent>
        <p id="headerP">Replace with Header Component</p>
        <TableContainer id="myTable">
          <Table sx={{ minWidth: 300 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Critical</TableCell>
                <TableCell align="center">High</TableCell>
                <TableCell align="center">Medium</TableCell>
                <TableCell align="center">Low</TableCell>
                <TableCell align="center">Info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((level) => (
                <TableRow key={level.critical}>
                  <TableCell align="center">{level.critical}</TableCell>
                  <TableCell align="center">{level.high}</TableCell>
                  <TableCell align="center">{level.medium}</TableCell>
                  <TableCell align="center">{level.low}</TableCell>
                  <TableCell align="center">{level.info}</TableCell>
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
                  primary="Created At"
                  secondary={'May 20, 2024, 12:56:00 (UTC-04)'}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Tag immutability"
                  secondary={'Disabled'}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Scan frequency"
                  secondary={'Scan on Push'}
                />
                <Switch id="scanOnPushSwitch" sx={{}} />
              </ListItem>
            </List>

            <Button id="detailsButton" size="small">
              Details
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
