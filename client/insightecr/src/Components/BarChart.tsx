import { BarChart } from '@mui/x-charts/BarChart';
import { SeverityCountsMap } from '../utils/types';

interface BasicStackingProps {
  inputData: SeverityCountsMap;
}

const BasicStacking: React.FC<BasicStackingProps> = ({ inputData }) => {
  // Unpacking repository names and initializing arrays for severity counts
  const repoNames = Object.keys(inputData);
  const critical = {
    data: repoNames.map((repoName) => inputData[repoName].critical),
    label: 'critical',
  };
  const high = {
    data: repoNames.map((repoName) => inputData[repoName].high),
    label: 'high',
  };
  const medium = {
    data: repoNames.map((repoName) => inputData[repoName].medium),
    label: 'medium',
  };
  const low = {
    data: repoNames.map((repoName) => inputData[repoName].low),
    label: 'low',
  };
  const info = {
    data: repoNames.map((repoName) => inputData[repoName].informational),
    label: 'info',
  };

  return (
    <BarChart
      // width={600}
      // height={300}
      series={[
        { ...critical, stack: 'total', color: '#8C1D18' },
        { ...high, stack: 'total', color: '#6750A4' },
        { ...medium, stack: 'total', color: '#D1A6FC' },
        { ...low, stack: 'total', color: '#D0BCFF' },
        { ...info, stack: 'total', color: '#CCC2DC' },
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
