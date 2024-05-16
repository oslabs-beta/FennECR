import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { DefaultizedPieValueType } from '@mui/x-charts';


const data = [
  { id: 0, value: 34, color: '#B6C5FC' , label: 'Total Number of Vulnerability Found'},
  { id: 1, value: 66, color: '#7965AF' ,  label: 'Total Number of Scanned Image' },
];

const TOTAL = data.map((item) => item.value).reduce((a,b) => a + b ,0);

const getArcLabel = (params: DefaultizedPieValueType) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
}


export default function BasicPie() {
    return (
      <PieChart
        series={[
          {
            data,  
            innerRadius: 75,
            paddingAngle: 1,
            cornerRadius: 5,
            arcLabel: getArcLabel,
            highlightScope: { faded:'global', highlighted:'item'},
            faded:{ innerRadius: 10, additionalRadius: -30, color:'gray'},
          },
        ]}
        width={400}
        height={400}
        margin={{ top: 100, bottom: 100, left: 100, right:100 }}
        slotProps={{
            legend: {
                direction:'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 0,
                // labelStyle: {fontSize:15}
            },
        }}
      />
    );
  }