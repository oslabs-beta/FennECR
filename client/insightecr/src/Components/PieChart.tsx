import { DefaultizedPieValueType, PieChart } from '@mui/x-charts';
import React from 'react';

interface BasicPieProps {
  inputData: {
    imageScanned: number;
    vulnerableImageCount: number;
  };
}
const BasicPie: React.FC<BasicPieProps> = ({ inputData }) => {
  const data = [
    {
      id: 0,
      value: inputData.vulnerableImageCount,
      color: '#FF6F61',
      label: `Images with Critical and High Vulnerabilities: ${inputData.vulnerableImageCount}`,
    },
    {
      id: 1,
      value: inputData.imageScanned - inputData.vulnerableImageCount,
      color: '#6BAED6',
      label: `Images without Critical and High Vulnerabilities: ${inputData.imageScanned - inputData.vulnerableImageCount}`,
    },
  ];

  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return params.value > 0 ?`${(percent * 100).toFixed(0)}%`:'';
  };
  return (
    <React.Fragment>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <PieChart
          series={[
            {
              data,
              innerRadius: 60,
              paddingAngle: 1,
              cornerRadius: 5,
              arcLabel: getArcLabel,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 10, additionalRadius: -30, color: 'gray' },
            },
          ]}
          // width={400}
          // height={330}
          margin={{ bottom: 100, left: 100, right: 100 }}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'bottom', horizontal: 'middle' },
              padding: 0,
              labelStyle: { fontSize: 15 },
            },
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default BasicPie;
