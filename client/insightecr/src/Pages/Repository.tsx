import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Header from '../Components/Header';
import { Finding, Image, ImageFinding, ImageScanResult } from '../utils/types';
import { AccountContext } from '../contexts/AccountContext';
import { getImages, getSingleScanResults } from '../utils/api';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../App';

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

  const [selectedImage, setSelectedImage] = useState<string[] | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [findings, setFindings] = useState<Finding[]>([]);

  useEffect(() => {
    const fetchImages = async (accountId: string, repoName: string) => {
      try {
        const response = await getImages(accountId, repoName);
        setImages(response.imageDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (accountId && repoName) {
      fetchImages(accountId, repoName);
    }
  }, [accountId, repoName]);

  const fetchImageFinding = async (
    accountId: string,
    repoName: string,
    imageTag: string
  ) => {
    try {
      const data: ImageScanResult = await getSingleScanResults(
        accountId,
        repoName,
        imageTag
      );
      if (data && data.imageScanFindings) {
        const mappedData = data.imageScanFindings.findings.map(
          (finding: ImageFinding, index: number) => {
            let packageName = '';
            let packageVersion = '';

            for (const attributes of finding.attributes) {
              if (attributes.key === 'package_name') {
                packageName = attributes.value;
              } else if (attributes.key === 'package_version') {
                packageVersion = attributes.value;
              }
            }

            return {
              id: `${packageName}-${packageVersion}-${index}`,
              name: finding.name,
              package: `${packageName}:${packageVersion}`,
              description: finding.description,
              severity: finding.severity,
              uri: finding.uri,
            };
          }
        );
        setFindings(mappedData);
      }
    } catch (error) {
      console.error('Error fetching image scan results:', error);
    }
  };

  const handleClickOpen = (image: any) => {
    if (image.imageTags && image.imageTags.length > 0) {
      const imageTag = image.imageTags[0]; // Use the first image tag
      setSelectedImage(image.imageTags);
      setOpen(true);
      fetchImageFinding(accountId, repoName, imageTag);
    } else {
      console.warn('No image tags found for the selected image.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
    setFindings([]);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'package', headerName: 'Package', flex: 1 },
    { field: 'severity', headerName: 'Severity', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 3 },
  ];

  const rows = findings;

  return (
    <React.Fragment>
      <Box marginLeft={'140px'}>
        <Header title={'Images'} />
      </Box>
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
                  {image.imageTags &&
                    image.imageTags.length > 0 &&
                    image.imageScanStatus.status === 'COMPLETE' && (
                      <Button
                        id='VulnerabilityDetails'
                        size='small'
                        onClick={() => handleClickOpen(image)}
                      >
                        Vulnerability Details
                      </Button>
                    )}
                </Grid>
              </CardContent>
            </Card>
          );
        })}
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
        <DialogTitle>Vulnerability Details</DialogTitle>
        <DialogContent>
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[25, 50, 100]}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default RepoPage;
