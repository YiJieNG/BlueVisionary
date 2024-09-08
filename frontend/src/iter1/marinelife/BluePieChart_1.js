import { PieChart } from '@mui/x-charts/PieChart';

function BluePieChart_1({data, height, width, updateEndangerType}) {
    return (
        <>
            <PieChart
                series={[
                    {
                        data: data,
                        innerRadius: 20,
                        outerRadius: 70,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -90,
                        endAngle: 360,
                        cx: width/5,
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

export default BluePieChart_1;

