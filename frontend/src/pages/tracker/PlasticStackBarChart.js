// import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Row } from "reactstrap";
// import trackData from "./plastic.json"
// import { Bar } from "react-chartjs-2";

function PlasticStackBarChart({ dataset, xLabels, yLabel }) {
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
      <div
        style={{
          padding: "13px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            height: "500px",
            width: "90%",
          }}
        >
          {dataset && (
            <BarChart
              series={dataset}
              xAxis={[
                {
                  data: xLabels,
                  scaleType: "band",
                  // label: "Time", // X-axis label
                  tickLabelProps: () => ({
                    fontSize: 14, // Font size of x-axis labels
                    fontWeight: "bold",
                  }),
                  labelStyle: {
                    fontSize: 16, // Font size of x-axis title
                    fontWeight: "bold",
                  },
                },
              ]}
              yAxis={[
                {
                  label: yLabel, // Y-axis label
                  labelStyle: {
                    fontSize: 16, // Font size of x-axis title
                    fontWeight: "bold",
                    transform: "translate(35px, -190px)",
                  },
                },
              ]}
              borderRadius={6}
              slotProps={{
                legend: {
                  labelStyle: {
                    fontSize: 16,
                    fill: "#1c3c58",
                    fontWeight: "bold",
                  },
                  // position: "right",
                },
              }}
              margin={{ top: 100 }}
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
