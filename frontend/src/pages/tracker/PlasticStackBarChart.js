import { useState, useEffect } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { Input, Row } from "reactstrap";
import trackData from "./plastic.json"

function PlasticStackBarChart() {
    const [selectedShowType, setSelectedShowType] = useState("Weekly");//past 7 days, this month, this year(start at month has data)
    const [dataset, setDataset] = useState();
    const [xLabels, setXLabels] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);



    useEffect(() => {
        const series = trackData.map((item) => {
            return {
                label: item.type,
                data: item.data.map((p) => p.weight),
                stack: 'total'
            }

        })
        setDataset(series);
    }, [selectedShowType])

    return (
        <>
            <div style={{ padding: "13px" }}>
                <h4>
                    Plastic history
                </h4>
                <Row>
                    <Input
                        type="select"
                    >
                        <option>
                            Weekly
                        </option>
                        <option>
                            Monthly
                        </option>
                        <option>
                            Yearly
                        </option>
                    </Input>
                </Row>
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