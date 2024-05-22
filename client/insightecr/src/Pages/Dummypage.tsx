import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import '../App.scss';
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CardContent from '@mui/material/CardContent';
// import Switch from '@mui/material/Switch';
import axios from 'axios';

// function createData(
//   critical: number,
//   high: number,
//   medium: number,
//   low: number,
//   info: number
// ) {
//   return { critical, high, medium, low, info };
// }

interface Image {
  imageDetails: {
    imageTags: string[];
    imageSizeInBytes: number;
    imageScanStatus: {
      status: string;
    };
    imagePushedAt: string;
    imageScanFindingsSummary: {
      findingSeverityCounts?: {
        CRITICAL: number;
        HIGH: number;
        MEDIUM: number;
        LOW: number;
        INFORMATIONAL: number;
      };
    };
  };
}

const Repo1: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/images/1/testrepo'
      );
      console.log('--------> ', response.data.imageDetails);
      setImages(response.data.imageDetails);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <>
      {images.map((image, index) => {
        //console.log('Logging image:' + image.imageTags)
        // if (!image.imageTags || !image.imageScanStatus) {
        //   const noDetails  = 'No details availible'
        //   // image.imageTags = noDetails
        //   return
        // }

        return (
          // <Card id = 'cardContainer' sx={{ borderRadius: 1}}>
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
                      <TableRow key={image.index}>
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
          // </Card>
        );
      })}
      ;
    </>
  );
};

// const Repository1 = () => {
//   const [data, setData] = useState({
//     imageTag: '',
//     pushed_At: '',
//     size: 0,
//     scanStatus: '',
//     critical: 0,
//     high: 0,
//     medium: 0,
//     low: 0,
//     info: 0,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('images/1/testrepo');
//         const {
//           imageTag,
//           pushed_At,
//           size,
//           scanStatus,
//           critical,
//           high,
//           medium,
//           low,
//           info,
//         } = response.data;
//         const imageDetailsArr: [] = response.data[imageDetails];

//         imageDetailsArr.map((image: [], index: number = 0) => {
//           const date: string = image[imagePushedAt];
//           const {imageScanFindingsSummary : {
//             findingSeverityCounts: {
//                 CRITICAL,
//                 HIGH,
//                 MEDIUM,
//                 LOW,
//                 INFORMATIONAL,
//             } = {},
//           }={},}=image
//         });

// response.data[imageDetails[3][imageScanFindingsSummary[findingSeverityCounts.MEDIUM]]]
//  {imageDetails{
//     3 : {
//         imageScanFindingsSummary : {
//             findingSeverityCounts: {
//                 "MEDIUM": 9,
//             "INFORMATIONAL": 4,
//             "LOW": 15
//             }
//         }
//     }
// }}
// Log Data
//         console.log('Testing log:' + response.data);
//         setData({
//           imageTag,
//           pushed_At,
//           size,
//           scanStatus,
//           critical,
//           high,
//           medium,
//           low,
//           info,
//         });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Card id='detailCard1"' sx={{ borderRadius: 7 }}>
//       <CardContent>
//         <p id="headerP">Replace with Header Component</p>
//         <TableContainer id="myTable">
//           <Table sx={{ minWidth: 300 }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center">Critical</TableCell>
//                 <TableCell align="center">High</TableCell>
//                 <TableCell align="center">Medium</TableCell>
//                 <TableCell align="center">Low</TableCell>
//                 <TableCell align="center">Info</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow key={data.critical}>
//                 <TableCell align="center">{data.critical}</TableCell>
//                 <TableCell align="center">{data.high}</TableCell>
//                 <TableCell align="center">{data.medium}</TableCell>
//                 <TableCell align="center">{data.low}</TableCell>
//                 <TableCell align="center">{data.info}</TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <List>
//               <ListItem>
//                 <ListItemText
//                   primary="Created At"
//                   secondary={'May 20, 2024, 12:56:00 (UTC-04)'}
//                 />
//               </ListItem>
//               <ListItem>
//                 <ListItemText
//                   primary="Tag immutability"
//                   secondary={'Disabled'}
//                 />
//               </ListItem>
//               <ListItem>
//                 <ListItemText
//                   primary="Scan frequency"
//                   secondary={'Scan on Push'}
//                 />
//                 <Switch id="scanOnPushSwitch" sx={{}} />
//               </ListItem>
//             </List>

//             <Button id="detailsButton" size="small">
//               Details
//             </Button>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

export default Repo1;
