import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CardContent from '@mui/material/CardContent';
import Header from '../Components/Header.tsx';
import { Image } from '../utils/types.ts';
import { AccountContext } from '../contexts/AccountContext.tsx';
import { getImages } from '../utils/api.ts';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../App.tsx';

const RepoPage: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);

  const [images, setImages] = useState<Image[]>([]);
  // Account Context
  const accountContext = useContext(AccountContext);
  // Check if context is undefined
  if (!accountContext) {
    throw new Error('Dashboard must be used within an AccountProvider');
  }
  const { accountId } = accountContext;
  const { repoName } = useParams<{ repoName: string }>();

  useEffect(() => {
    const fetchImages = async (accountId: string, repoName: string) => {
      try {
        const response = await getImages(accountId, repoName);
        //console.log('--------> ', response.imageDetails);
        setImages(response.imageDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (accountId && repoName) {
      fetchImages(accountId, repoName);
    }
  }, [accountId, repoName]);

  return (
    <React.Fragment>
      <Header title={'Images'} />
      <Grid
        container
        justifyContent={'center'}
        gap={2}
        sx={{ marginBottom: '40px' }}
      >
        {images.map((image, index) => {
          return (
            <Card
              key={index}
              sx={{
                borderRadius: 7,
                marginBottom: 2,
                minHeight: '360px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: darkMode ? '#45494F' : '#E8DEF8',
              }}
            >
              <CardContent id='repoCards'>
                <Grid
                  container
                  item
                  xs={12}
                  display={'flex'}
                  direction={'column'}
                >
                  <List>
                    <ListItem>
                      <ListItemText
                        primary='Image tags'
                        secondary={
                          image.imageTags
                            ? image.imageTags.join(', ')
                            : 'Unknown'
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary='Pushed at'
                        secondary={new Date(
                          image.imagePushedAt
                        ).toLocaleString()}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary='Size(MB)'
                        secondary={(image.imageSizeInBytes / 1000000).toFixed(
                          2
                        )}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary='Scan Status'
                        secondary={
                          image.imageScanStatus
                            ? image.imageScanStatus.status
                            : 'Unknown'
                        }
                      />
                    </ListItem>
                  </List>
                  <TableContainer id='myTable'>
                    <Table sx={{ minWidth: 300 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell align='center'>Critical</TableCell>
                          <TableCell align='center'>High</TableCell>
                          <TableCell align='center'>Medium</TableCell>
                          <TableCell align='center'>Low</TableCell>
                          <TableCell align='center'>Info</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow key={123456}>
                          <TableCell align='center'>
                            {image.imageScanFindingsSummary
                              ?.findingSeverityCounts.CRITICAL || 0}
                          </TableCell>
                          <TableCell align='center'>
                            {image.imageScanFindingsSummary
                              ?.findingSeverityCounts.HIGH || 0}
                          </TableCell>
                          <TableCell align='center'>
                            {image.imageScanFindingsSummary
                              ?.findingSeverityCounts.MEDIUM || 0}
                          </TableCell>
                          <TableCell align='center'>
                            {image.imageScanFindingsSummary
                              ?.findingSeverityCounts.LOW || 0}
                          </TableCell>
                          <TableCell align='center'>
                            {image.imageScanFindingsSummary
                              ?.findingSeverityCounts.INFORMATIONAL || 0}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button id='VulnerabilityDetails' size='small'>
                    Vulnerability Details
                  </Button>
                </Grid>
                {/* </Grid> */}
              </CardContent>
            </Card>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default RepoPage;
