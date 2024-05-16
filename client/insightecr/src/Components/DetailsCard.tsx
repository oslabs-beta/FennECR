import { Paper } from '@mui/material';
import '../App.scss'
import { Grid } from '@mui/material';

const DetailsCard = () => {
    return (
    <Grid container spacing={28}>
    <Grid item>
        <Paper id='detailsCard1' elevation={2}>sample-Repo 1</Paper>
    </Grid>
    <Grid item >
        <Paper id='detailsCard2' elevation={2}>sample-repo 2</Paper>
    </Grid>
  </Grid>    




)
}

export default DetailsCard;