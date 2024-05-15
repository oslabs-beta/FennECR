import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { AxisConfig } from '@mui/x-charts';

const lowData = [10, 20, 30, 40, 50, 60, 70];
const medData = [5, 10, 15, 20, 25, 30, 35];
const highData = [90, 80, 70, 60, 50, 40, 30];
const critData = [9, 7, 5, 6, 3, 2, 1];

const xLabels = [
  'Img A',
  'Img B',
  'Img C',
  'Img D',
  'Img E',
  'Img F',
  'Img G',
];

export default function PosNegBarChart() {
  return (
    <BarChart
      width={550}
      height={330}
      series={[
        {
          data: lowData,
          label: 'low',
        },
        {
            data: medData,
            label: 'medium',
          },
          {
            data: highData,
            label: 'high',
          },
          {
            data: critData,
            label: 'critical',
          },
      ]}
      xAxis={[
        {
          data: xLabels,
          scaleType: 'band',
        } as Omit<AxisConfig, 'id'>,
      ]}
      yAxis={[{ max: 100 }]}
    />
  );
}