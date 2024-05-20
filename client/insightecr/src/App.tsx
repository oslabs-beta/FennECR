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
  );
}

export default App;
