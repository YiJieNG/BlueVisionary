import { Colors } from "chart.js";
import { useEffect, useRef } from "react";
import { Radar } from "react-chartjs-2";

function PollutionRadarChart({
  data,
  selectedState,
  handlePollutionTypeChange,
}) {
  const getLabelIndex = (x, y, pointsLabelItems) => {
    let index = -1;
    pointsLabelItems.forEach((element, i) => {
      const { bottom, top, left, right } = element;
      if (x <= right && x >= left && y >= top && y <= bottom) {
        index = i;
      }
    });
    return index;
  };
  const toCamelCase = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  const chartRef = useRef(null);
  const radarData = {
    labels: data
      .find((item) => item.state === selectedState)
      .pollutions.map((item) => toCamelCase(item.type)),
    datasets: [
      {
        label: "Polycount",
        // data: [65, 59, 90, 81, 56, 55, 40],
        data: data
          .find((item) => item.state === selectedState)
          .pollutions.map((item) => item.count),
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    elements: {
      line: {
        borderWidth: 4,
      },
    },
    layout: {
      padding: 0,
    },
    scales: {
      r: {
        grid: {
          lineWidth: 4,
        },
        pointLabels: {
          font: {
            size: 18,
            weight: "bold",
          },
          color: "#0981b4",
        },
      },
    },
    onClick: (event) => {
      // const chart = chartRef.current;
      // if (!chart) return;

      // // Get the elements at the event (on click)
      // const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

      // if (points.length) {
      //     const firstPoint = points[0];
      //     const label = chart.data.labels[firstPoint.index];
      //     // const datasetLabel = chart.data.datasets[firstPoint.datasetIndex].label;
      //     // const value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];

      //     // alert(`You clicked on: \nLabel: ${label}, \nDataset: ${datasetLabel}, \nValue: ${value}`);
      //     handlePollutionTypeChange(label);
      // }

      const chart = chartRef.current;

      if (!chart) return;

      const {
        ctx,
        scales: { r },
      } = chart;

      const labels = chart.data.labels;

      // Get the click position
      const { x: clickX, y: clickY } = event;

      const labelIndex = getLabelIndex(clickX, clickY, r._pointLabelItems);
      if (labelIndex !== -1) {
        handlePollutionTypeChange(labels[labelIndex]);
      }
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };
  return (
    <>
      <Radar ref={chartRef} data={radarData} options={options} />
    </>
  );
}

export default PollutionRadarChart;
