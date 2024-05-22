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
import { Image } from '../utils/types';

interface ImageDetailProps {
  data: Image;
}
