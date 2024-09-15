import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function PollutionLineChart({ data, selectedState }) {
  const [selectedData, setSelectedData] = useState();

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to adjust its aspect ratio based on container
    plugins: {
      legend: {
        display: true, // Display the legend
      },
      // title: {
      //   display: true,
      //   text: "Top polymer type between 2021 and 2024",
      // },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const years = ["2021", "2022", "2023", "2024"];

  // Helper function to generate colors based on pollution type
  const getColor = (pollutionType) => {
    return pollutionType === "polyethylene"
      ? "#4FB5F9"
      : pollutionType === "polypropylene"
      ? "#F9CC4F"
      : pollutionType === "polyethylene glycol"
      ? "#cc34eb"
      : pollutionType === "thermoplastic"
      ? "#2EA404"
      : pollutionType === "thermoset"
      ? "#f52d0a"
      : "#4A23E6";
  };

  useEffect(() => {
    const selectedStateData = data.find((p) => p.state === selectedState);
    if (selectedStateData) {
      const datasets = selectedStateData.pollutions.map((item) => ({
        label: item.type,
        data: item.data,
        borderColor: getColor(item.type), // Use helper function to assign colors
        fill: false,
      }));

      // Chart configuration with datasets
      const chartData = {
        labels: years,
        datasets: datasets,
      };
      setSelectedData(chartData);
    }
  }, [selectedState, data]);

  // Resize event listener to force re-render on window resize
  useEffect(() => {
    const handleResize = () => {
      setSelectedData((prevData) => ({ ...prevData })); // Trigger re-render
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ padding: "13px" }}>
      <h4>Polymer Trends by Type: 2021–2024</h4>
      <div style={{ height: "400px", width: "100%" }}>
        {selectedData && <Line data={selectedData} options={options} />}
      </div>
    </div>
  );
}

export default PollutionLineChart;
