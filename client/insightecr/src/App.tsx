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
  );
}
