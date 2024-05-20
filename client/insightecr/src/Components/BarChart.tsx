import { BarChart } from '@mui/x-charts/BarChart';
// import { AxisConfig, BarChart } from '@mui/x-charts';

// const infoData = [50, 90, 65, 75, 85, 95, 99];
// const lowData = [10, 20, 30, 40, 50, 60, 70];
// const medData = [5, 10, 15, 20, 25, 30, 35];
// const highData = [90, 80, 70, 60, 50, 40, 30];
// const critData = [9, 7, 5, 6, 3, 2, 1];

const xLabels = [
  'Img A',
  'Img B',
  'Img C',
  'Img D',
  'Img E',
];

// export default function PosNegBarChart() {
//   return (
//     <BarChart
//       // width={550}
//       // height={330}
//       series={[
//         {
//           data: critData,
//           label: 'critical',
//         },
//         {
//             data: highData,
//             label: 'high',
//           },
//           {
//             data: medData,
//             label: 'medium',
//           },
//           {
//             data: lowData,
//             label: 'low',
//           },
//           {
//             data: infoData,
//             label: 'informational',
//           },
//       ]}
//       xAxis={[
//         {
//           data: xLabels,
//           scaleType: 'band',
//         } as Omit<AxisConfig, 'id'>,
//       ]}
//       yAxis={[{ max: 100 }]}
//     />
//   );
// }

const critical = {
  data: [2, 3, 1, 4, 5],
  label: 'critical',
};
const high = {
  data: [3, 1, 4, 2, 1],
  label: 'high',
};
const medium = {
  data: [3, 2, 4, 5, 1],
  label: 'medium',
};
const low = {
  data: [3, 2, 4, 5, 1],
  label: 'low',
};
const info = {
  data: [3, 2, 4, 5, 1],
  label: 'info',
};
export default function BasicStacking() {
  return (
    <BarChart
      width={600}
      height={300}
      
      series={[
        { ...critical, stack: 'total', color: '#8C1D18' },
        { ...high, stack: 'total', color: '#6750A4' },
        { ...medium, stack: 'total', color: '#D1A6FC' },
        { ...low, stack: 'total', color: '#D0BCFF' },
        { ...info, stack: 'total', color: '#CCC2DC'},
      ]}
            xAxis={[
        {
          data: xLabels,
          scaleType: 'band',
        }
      ]}
    />
  );
}