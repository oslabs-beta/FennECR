import { BarChart } from '@mui/x-charts/BarChart';
import { SeverityCountsMap } from '../utils/types';
import React, { useContext } from 'react';
import { ThemeContext } from '../App';

interface BasicStackingProps {
  inputData: SeverityCountsMap;
}

const BasicStacking: React.FC<BasicStackingProps> = ({ inputData }) => {
    // destructure the darkMode value from Context
    const { darkMode } = useContext(ThemeContext);
  // Unpacking repository names and initializing arrays for severity counts
  const repoNames = Object.keys(inputData);
  const critical = {
    data: repoNames.map((repoName) => inputData[repoName].critical),
    label: 'critical',
    color: darkMode ? '#4B00D1' : '#8C1D18'
  };
  const high = {
    data: repoNames.map((repoName) => inputData[repoName].high),
    label: 'high',
    color: darkMode ? '#7F22FD' : '#6750A4'
  };
  const medium = {
    data: repoNames.map((repoName) => inputData[repoName].medium),
    label: 'medium',
    color: darkMode ? '#D7B7FD' : '#D1A6FC'

  };
  const low = {
    data: repoNames.map((repoName) => inputData[repoName].low),
    label: 'low',
    color: darkMode ? '#CCC2DC' : '#D0BCFF'

  };
  const info = {
    data: repoNames.map((repoName) => inputData[repoName].informational),
    label: 'info',
    color: darkMode ? '#D0BCFF' : '#CCC2DC'

  };

  return (
    <BarChart
      // width={600}
      // height={300}
      series={[
        { ...critical, stack: 'total'},
        { ...high, stack: 'total'},
        { ...medium, stack: 'total'},
        { ...low, stack: 'total' },
        { ...info, stack: 'total' },
      ]}
      xAxis={[
        {
          data: repoNames,
          scaleType: 'band',
          tickSize: 10,
        },
      ]}
    />
  );
};

export default BasicStacking;
