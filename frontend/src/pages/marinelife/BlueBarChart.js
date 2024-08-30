import { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Paper } from '@mui/material';

function BlueBarChart({ xAxis, data, height, width, updateSpeciesSelected, updateModalStatus }) {
    // const [itemData, setItemData] = useState();
    // const [axisData, setAxisData] = useState();
    const CustomItemTooltipContent = (props) => {
        const { itemData, series } = props;
        console.log(series);
        return (
            <Paper>
            <p>test</p>

            </Paper>
        );
    };
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
                onAxisClick={(event, d) => {
                    updateSpeciesSelected(d.axisValue);
                }}
            />
        </>
    );
}

export default BlueBarChart;

