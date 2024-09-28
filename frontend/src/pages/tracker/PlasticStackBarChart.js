// import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Row } from "reactstrap";
// import trackData from "./plastic.json"
// import { Bar } from "react-chartjs-2";

function PlasticStackBarChart({ dataset, xLabels }) {
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: false,
  //       text: "Stacked Bar Chart Example",
  //     },
  //   },
  //   scales: {
  //     x: {
  //       stacked: true,
  //       title: {
  //         display: true,
  //         text: "Time",
  //       },
  //       grid: {
  //         display: false,
  //       },
  //     },
  //     y: {
  //       stacked: true,
  //       title: {
  //         display: true,
  //         text: "Plastic recycle",
  //       },
  //       // grid: {
  //       //     display: false
  //       // }
  //     },
  //   },
  // };
  return (
    <>
      <div style={{ padding: "13px" }}>
        <Row style={{ height: "400px", width: "100%" }}>
          {dataset && (
            <BarChart
              series={dataset}
              xAxis={[
                {
                  data: xLabels,
                  scaleType: "band",
                  // label: "Time", // X-axis label
                },
              ]}
              // yAxis={[
              //   {
              //     label: "Plastic recycled", // Y-axis label
              //   },
              // ]}
              borderRadius={6}
              slotProps={{
                legend: {
                  labelStyle: {
                    fontSize: 10,
                  },
                },
              }}
            />
          )}
        </Row>
        {/* <Bar 
                    data={{
                        labels: xLabels,
                        datasets: dataset
                    }}
                    options={options}
                    /> */}
      </div>
      {/* </div> */}
    </>
  );
}

export default PlasticStackBarChart;
