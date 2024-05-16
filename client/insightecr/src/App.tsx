import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import PosNegBarChart from './Components/BarChart';
import BasicPie from './Components/PieChart';
import NavBar from './Components/NavBar';
import BasicContainer from './Components/Container';
import Header from './Components/Header';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <NavBar/>
          </Item>
        </Grid>
        <Grid item xs={5}>
          <Item>
            <BasicContainer header={Header} title='PieChart' component={BasicPie}/>
          </Item>
        </Grid>
        <Grid item xs={7}>
          <Item>
            <BasicContainer header={Header} title='BarChart' component={PosNegBarChart}/>
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
