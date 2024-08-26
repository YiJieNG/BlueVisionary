import { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

function BlueBarChart({ xAxis, data, height, width, updateSpeciesSelected, updateModalStatus }) {
    // const [itemData, setItemData] = useState();
    // const [axisData, setAxisData] = useState();
    return (
        <>
            <BarChart
                xAxis={xAxis}
                series={data}
                width={width}
                height={height}
                borderRadius={10}
                grid={{ horizontal: true }}
                margin={{
                    left: 0,
                    right: 0,
                  }}
                //   onItemClick={(event, d) => setItemData(d)}
                  onAxisClick={(event, d) => {
                    updateSpeciesSelected(d.axisValue);
                }}
                
            />
        </>
    );
}

export default BlueBarChart;

