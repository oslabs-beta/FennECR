import React from 'react';
import { Paper, colors } from '@mui/material';
import '../App.css'
import { Grid } from '@mui/material';

const DetailsCard = props => {
    return (
    <Grid container spacing={20}>
    <Grid item>
        <Paper id='detailsCard1' elevation={2}>sample-Repo 1</Paper>
    </Grid>
    <Grid item>
        <Paper id='detailsCard2' elevation={2}>sample-repo 2</Paper>
    </Grid>
  </Grid>    




)
}

export default DetailsCard;