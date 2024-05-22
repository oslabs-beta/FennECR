import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import '../App.scss';
import React, { useState, useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CardContent from '@mui/material/CardContent';
import { Image } from '../utils/types';
import { AccountContext } from '../contexts/AccountContext.tsx';
import { getRepositoryData } from '../utils/api';




  const Repo1: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);
    
    useEffect(() => {
      getImages();
    }, []);
    
    const accountId = useContext(AccountContext);
    const repoName ='testrepo';
    
    const getImages = async () => {
      try {
        const response = await getRepositoryData(accountId, repoName);
        console.log('--------> ', response.imageDetails);
        setImages(response.imageDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    return (
      // <React.Fragment>
      <>
    { images.map((image, index) => {
      return (
      <CardContent id="repoCards">
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Image tags"
                      secondary={image.imageTags || 'Unknown'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Pushed at"
                      secondary={new Date(image.imagePushedAt).toLocaleString()}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Size(MB)"
                      secondary={image.imageSizeInBytes / 1000000}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Scan Status"
                      secondary={image.imageScanStatus?.status || 'Unknown'}
                    />
                  </ListItem>
                </List>
                <TableContainer id="myTable">
                  <Table sx={{ minWidth: 300 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Critical</TableCell>
                        <TableCell align="center">High</TableCell>
                        <TableCell align="center">Medium</TableCell>
                        <TableCell align="center">Low</TableCell>
                        <TableCell align="center">Info</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow key={123456}>
                        <TableCell align="center">
                          {image.imageScanFindingsSummary?.findingSeverityCounts
                            .CRITICAL || 0}
                        </TableCell>
                        <TableCell align="center">
                          {image.imageScanFindingsSummary?.findingSeverityCounts
                            .HIGH || 0}
                        </TableCell>
                        <TableCell align="center">
                          {image.imageScanFindingsSummary?.findingSeverityCounts
                            .MEDIUM || 0}
                        </TableCell>
                        <TableCell align="center">
                          {image.imageScanFindingsSummary?.findingSeverityCounts
                            .LOW || 0}
                        </TableCell>
                        <TableCell align="center">
                          {image.imageScanFindingsSummary?.findingSeverityCounts
                            .INFORMATIONAL || 0}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button id="VulnerabilityDetails" size="small">
                  Vulnerability Details
                </Button>
              </Grid>
            </Grid>
          </CardContent>
      );
    })
  }
  </>
  // </React.Fragment>
);
};
// }

export default Repo1;
