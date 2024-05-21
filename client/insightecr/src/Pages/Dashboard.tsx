import { Container, Grid, Paper } from '@mui/material';
import BasicPie from '../Components/PieChart';
import Header from '../Components/Header';
import BasicStacking from '../Components/BarChart';
import DetailsCard from '../Components/DetailsCard';

// Control whether Nav drawer loads open or closed
export default function Dashboard() {
  return (
    <Container id='charts' maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={5}>
        {/* Vulnerability Summary */}
        <Grid item xs={12} md={5} lg={5}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 360,
              textAlign: 'center',
              background: '#E8E8FD',
              borderRadius: 3,
            }}
          >
            <Header title={'Vulnerability Summary'} />
            <BasicPie />
          </Paper>
        </Grid>
        {/* Severity Breakdown */}
        <Grid item xs={12} md={7} lg={7}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 360,
              textAlign: 'center',
              background: '#E8E8FD',
              borderRadius: 3,
            }}
          >
            <Header title={'Severity Breakdown'} />
            <BasicStacking />
          </Paper>
        </Grid>
        {/* Vulnerability Details */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              background: '#E8E8FD',
              borderRadius: 3,
              alignItems: 'center',
            }}
          >
            <Header title={'Vulnerability Details'} />
            <Grid container xs={12} spacing={4} id='detailsContainer'>
              <Grid item xs={5}>
                <DetailsCard />
              </Grid>
              <Grid item xs={5}>
                <DetailsCard />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
