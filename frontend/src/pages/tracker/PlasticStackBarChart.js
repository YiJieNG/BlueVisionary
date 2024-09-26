import { useState, useEffect } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { Input, Row } from "reactstrap";
import trackData from "./plastic.json"

function PlasticStackBarChart(xLabels, dataset) {
    // const [dataset, setDataset] = useState();
    // const [xLabels, setXLabels] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);



    // useEffect(() => {
    //     const series = trackData.map((item) => {
    //         return {
    //             label: item.type,
    //             data: item.data.map((p) => p.weight),
    //             stack: 'total'
    //         }

    //     })
    //     setDataset(series);
    // }, [])
    useEffect(() => {
        console.log(xLabels);
        console.log(dataset);
    });

    return (
        <>
            <div style={{ padding: "13px" }}>
                <Row>
                    {dataset &&
                        <BarChart
                            width={700}
                            height={300}
                            series={dataset}
                            xAxis={[{ data: xLabels, scaleType: 'band' }]}
                        />
                    }
                </Row>

            </div>
        </>
    );
}

export default PlasticStackBarChart;