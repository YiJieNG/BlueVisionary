import { BarChart } from '@mui/x-charts/BarChart';

function BlueBarChart({ xAxis, data, height, width }) {
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
                
            />
        </>
    );
}

export default BlueBarChart;

