import { DefaultizedPieValueType, PieChart } from '@mui/x-charts';
import React from 'react';


const data = [
  { id: 0, value: 34, color: '#B6C5FC' , label: 'Images with Critical and High Vulnerabilities'},
  { id: 1, value: 66, color: '#7965AF' ,  label: 'Total Number of Scanned Image' },
];

const TOTAL = data.map((item) => item.value).reduce((a,b) => a + b ,0);

const getArcLabel = (params: DefaultizedPieValueType) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
}


const BasicPie:React.FC = () => {
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
            highlightScope: { faded:'global', highlighted:'item'},
            faded:{ innerRadius: 10, additionalRadius: -30, color:'gray'},
          },
        ]}
        // width={400}
        // height={330}
        margin={{bottom: 100,  left: 100, right:100 }}
        slotProps={{
            legend: {
                direction:'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 0,
                labelStyle: {fontSize:15}
            },
        }}
      />
    </div>
    </React.Fragment>
    );
  }

  export default BasicPie