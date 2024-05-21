import React, { useEffect, useState, useContext } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import BasicPie from '../Components/PieChart';
import Header from '../Components/Header';
import BasicStacking from '../Components/BarChart';
import DetailsCard from '../Components/DetailsCard';
import { getAllRepositories } from '../utils/api';
import { AccountContext } from '../contexts/AccountContext.tsx';
import { Repository } from '../utils/types';

// Control whether Nav drawer loads open or closed
export default function Dashboard() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const accountId = useContext(AccountContext);
  // console.log(`I am accountId: ${accountId}`)

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const data = await getAllRepositories(accountId);
        setRepositories(data.repositories);
      } catch (error) {
        console.error('Error fetching repositories data:', error);
      }
    };

    fetchRepoData();
  }, [accountId]);

  const handleScanOnPushToggle = (repoName: string, scanOnPush:boolean) => {
    setRepositories((prevRepos) =>
      prevRepos.map((repo) =>
        repo.repositoryName === repoName
          ? {
              ...repo,
              imageScanningConfiguration: {
                ...repo.imageScanningConfiguration,
                scanOnPush,
              },
            }
          : repo
      )
    );
  };

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
            <Header title={'Repository Vulnerability Details'} />
            <Grid container spacing={6} id='detailsContainer'>
                {repositories.map((repo, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <DetailsCard data={repo} onScanOnPushToggle={handleScanOnPushToggle}/>
                  </Grid>
                ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
