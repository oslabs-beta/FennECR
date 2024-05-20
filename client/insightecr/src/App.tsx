<<<<<<< HEAD
import {Box, Grid} from '@mui/material'
import NavDrawer from './Components/NavDrawer';

export default function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <NavDrawer/>
        </Grid>
      </Grid>
    </Box>
=======
import { Grid } from '@mui/material';
import './App.scss';
import VulnerabilityDetails from './Components/VulnerabilityDetails.tsx';

function App() {
  return (
    <Grid container spacing={12}>
      <Grid item xs={8} id="vulnerabilityDetailsGrid">
        <VulnerabilityDetails />
      </Grid>
    </Grid>
>>>>>>> origin/feature-detailCard
  );
}
