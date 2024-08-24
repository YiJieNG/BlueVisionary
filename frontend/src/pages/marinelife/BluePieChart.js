import { PieChart } from '@mui/x-charts/PieChart';

function BluePieChart({data, height, width}) {
    return (
        <>
            <PieChart
                series={[
                    {
                        data: data,
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -90,
                        endAngle: 360,
                        cx: 150,
                        cy: 150,
                    }
                ]}
                width={width}
                height={height}
            />
        </>
    );
}

export default BluePieChart;

