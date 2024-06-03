import { Key, useContext, useState, useEffect } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import BasicPie from '../Components/PieChart';
import Header from '../Components/Header';
import BasicStacking from '../Components/BarChart';
import DetailsCard from '../Components/DetailsCard';
import { Repository } from '../utils/types';
import { RepoContext } from '../contexts/RepoContext.tsx';
import { AccountContext } from '../contexts/AccountContext.tsx';
import { getAggregatedScanResults } from '../utils/api';
import { SeverityCountsMap } from '../utils/types';
import { ThemeContext } from '../App';

// Control whether Nav drawer loads open or closed
const Dashboard: React.FC = () => {
// destructure the darkMode value from Context
const { darkMode } = useContext(ThemeContext);
  const accountId = useContext(AccountContext);
  const repoContext = useContext(RepoContext);
  const { repositories, setRepositories } = repoContext;
  const [aggregatedPieData, setAggregatedPieData] = useState({
    imageScanned: 0 as number,
    vulnerableImageCount: 0 as number,
  });
  const [severityCounts, setSeverityCounts] = useState<SeverityCountsMap>({});

  useEffect(() => {
    const fetchResultData = async () => {
      try {
        let totalImageScanned = 0;
        let totalVulnerableImageCount = 0;
        const newSeverityCounts: SeverityCountsMap = {};

        await Promise.all(
          repositories.map(async (repo) => {
            const data = await getAggregatedScanResults(
              accountId,
              repo.repositoryName
            );
            if (data) {
              totalImageScanned += data.imageScanned;
              totalVulnerableImageCount += data.vulnerbleImageCount;
              newSeverityCounts[repo.repositoryName] = data.severityCounts;
            } else {
              // If no data is found, set default severity counts
              newSeverityCounts[repo.repositoryName] = {
                critical: 0,
                high: 0,
                medium: 0,
                low: 0,
                informational: 0,
              };
            }
          })
        );

        setAggregatedPieData({
          imageScanned: totalImageScanned,
          vulnerableImageCount: totalVulnerableImageCount,
        });

        setSeverityCounts(newSeverityCounts);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchResultData();
  }, [accountId, repositories]);

  const handleScanOnPushToggle = (repoName: string, scanOnPush: boolean) => {
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
    <Container id="charts" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
              background: darkMode ? '#1E1E1E' : '#E8E8FD',
              borderRadius: 3,
            }}
          >
            <Header title={'Vulnerability Summary'} />
            <BasicPie inputData={aggregatedPieData} />
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
              background: darkMode ? '#1E1E1E' : '#E8E8FD',
              borderRadius: 3,
            }}
          >
            <Header title={'Severity Breakdown'} />
            <BasicStacking inputData = {severityCounts}/>
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
              background: darkMode ? '#1E1E1E' : '#E8E8FD',
              borderRadius: 3,
              alignItems: 'center',
            }}
          >
            <Header title={'Repository Vulnerability Details'} />
            <Grid container spacing={6} id="detailsContainer">
              {repositories.map(
                (repo: Repository, index: Key | null | undefined) => (
                  <Grid item xs={12} sm={6.5} md={6} lg={5} key={index}>
                    <DetailsCard
                      data={repo}
                      severityCounts={
                        severityCounts[repo.repositoryName] || {
                          critical: 0,
                          high: 0,
                          medium: 0,
                          low: 0,
                          informational: 0,
                        }
                      }
                      onScanOnPushToggle={handleScanOnPushToggle}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
