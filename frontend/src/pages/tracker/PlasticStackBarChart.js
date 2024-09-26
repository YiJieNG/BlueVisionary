// import { useState, useEffect } from "react";
// import { BarChart } from '@mui/x-charts/BarChart';
import { Row } from "reactstrap";
// import trackData from "./plastic.json"
import { Bar } from "react-chartjs-2";

function PlasticStackBarChart({dataset, xLabels}) {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Stacked Bar Chart Example",
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      };
    return (
        <>
            <div style={{ padding: "13px" }}>
                <Row>
                    {/* {dataset &&
                        <BarChart
                            width={700}
                            height={400}
                            series={dataset}
                            xAxis={[{ data: xLabels, scaleType: 'band' }]}
                            borderRadius={8}
                            slotProps={{
                                legend: {
                                  labelStyle: {
                                    fontSize: 10,
                                    // fill: 'blue',
                                  },
                                },
                              }}
                        />
                    } */}
                    <Bar 
                    data={{
                        labels: xLabels,
                        datasets: dataset
                    }}
                    options={options}
                    />
                </Row>

            </div>
        </>
    );
}

export default PlasticStackBarChart;