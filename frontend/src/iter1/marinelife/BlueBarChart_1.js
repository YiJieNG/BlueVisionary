
import { BarChart } from '@mui/x-charts/BarChart';

function BlueBarChart_1({ xAxis, data, height, width, updateSpeciesSelected, updateModalStatus }) {
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

export default BlueBarChart_1;

