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
// // import Switch from '@mui/material/Switch';
import { Image } from '../utils/types';
import { AccountContext } from '../contexts/AccountContext.tsx';
import { getRepositoryData } from '../utils/api';
import { RepoContext } from '../contexts/RepoContext.tsx';
import DetailsCard from '../Components/DetailsCard.tsx';

export default function Repository1 () {
  const repoContext = useContext(RepoContext);
  const { repositories, setRepositories } = repoContext;


  
  setRepositories((prevRepos) =>
    prevRepos.map((repo) =>
      if (repo.repositoryName === 'testrepo') {
        console.log('Test')
      }
    )
  );
    





  
  const Repo1: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);
    
    useEffect(() => {
      getImages();
    }, []);
    
    const accountId = useContext(AccountContext);
    
    const getImages = async () => {
      try {
        const response = await getRepositoryData(accountId, repoName);
        console.log('--------> ', response.data.imageDetails);
        setImages(response.data.imageDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    return (
  

  { images.map((image, index) => {
    return (
      
      );
    })
  }
);
};
}
