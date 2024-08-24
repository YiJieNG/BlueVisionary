import { PieChart } from '@mui/x-charts/PieChart';

function BluePieChart({data, height, width, updateEndangerType}) {
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
                        cx: 0,
                        cy: height/2,
                    }
                ]}
                width={width}
                height={height}
                onItemClick={(event, d) => updateEndangerType(data[d.dataIndex].label)}
            />
        </>
    );
}

export default BluePieChart;

