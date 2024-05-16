import { Paper } from '@mui/material';
import '../App.scss';
import { Grid } from '@mui/material';
import Header from './Header';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { version } from 'react';

const DetailsCard = () => {
  return (
    <Grid container spacing={28}>
      <Grid item>
        <Paper id="detailsCard1" elevation={2}>
          <Header title={'Header 1 goes here'} />
          <List id="detailsCardList2" subheader={<li />}>
            <li>
              <ul>
                <ListSubheader id="detailsCardListSubHeader2">
                  {'Summary'}
                </ListSubheader>
                <ListItem>
                  <ListItemText
                    id="detailsTextSummary"
                    primary="A code execution vulnerability exists in the directory rehashing functionality of E2fsprogs e2fsck 1.45.4."
                  />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader id="detailsCardListSubHeader2">
                  {'Package Name'}
                </ListSubheader>
                <ListItem>
                  <ListItemText primary="Our Package Name" />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader id="detailsCardListSubHeader2">
                  {'Package Version'}
                </ListSubheader>
                <ListItem>
                  <ListItemText primary={version} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader id="detailsCardListSubHeader2">
                  {'Severity'}
                </ListSubheader>
                <ListItem>
                  <ListItemText primary="Really really really bad..." />
                </ListItem>
              </ul>
            </li>
          </List>
        </Paper>
      </Grid>
      <Grid item>
        <Paper id="detailsCard2" elevation={2}>
          <Header title={'Header 2 goes here'} />
          <List id="detailsCardList2" subheader={<li />}>
            <li>
              <ul>
                <ListSubheader id="detailsCardListSubHeader2">
                  {'Package Name'}
                </ListSubheader>
                <ListItem>
                  <ListItemText primary="Our Package Name" />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader id="detailsCardListSubHeader2">
                  {'Package Version'}
                </ListSubheader>
                <ListItem>
                  <ListItemText primary={version} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader id="detailsCardListSubHeader2">
                  {'Severity'}
                </ListSubheader>
                <ListItem>
                  <ListItemText primary="Really really really bad..." />
                </ListItem>
              </ul>
            </li>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DetailsCard;
