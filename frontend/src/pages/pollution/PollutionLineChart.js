import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

function PollutionLineChart({ data }) {
  // const data = {
  //   labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       data: [65, 59, 80, 81, 56, 55, 40],
  //       fill: false,
  //       borderColor: 'rgba(75, 192, 192, 1)',
  //       tension: 0.1,
  //     },
  //       {
  //         label: 'Dataset 2',
  //         data: [28, 48, 40, 19, 86, 27, 90],
  //         fill: false,
  //         borderColor: 'rgba(153, 102, 255, 1)',
  //         tension: 0.1,
  //       },
  //   ],
  // };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'top',
        // display: false, // Hide the legend
      },
      title: {
        display: true,
        text: "Top plastic type between 2021 and 2024",
      },
    },
    scales: {
      y: {
        // beginAtZero: true,
      },
    },
  };

  const [selectedTypes, setSelectedTypes] = useState(data.filter(p => p.type !== "others").map((p) => p.type));
  const [selectedData, setSelectedData] = useState();

  // Extract years from the data
  const years = ['2021', '2022', '2023', '2024'];

  // Handle checkbox change
  const handleCheckboxChange = (type) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type]
    );
  };

  // Helper function to generate random colors
  const getColor = (pollutionType) => {
    return pollutionType === "polyethylene" ? "#4FB5F9" :
      pollutionType === "polypropylene" ? "#F9CC4F" :
        pollutionType === "polyethylene glycol" ? "#8834E8" :
          pollutionType === "thermoplastic" ? "#2EA404" :
            pollutionType === "thermoset" ? "#23E0E6" : "#4A23E6"
  };

  useEffect(() => {
    // Prepare datasets for the chart
    const filteredData = data.filter((item) =>
      selectedTypes.includes(item.type)
    );

    const datasets = filteredData.map((item) => ({
      label: item.type,
      data: item.pollutions.map((pollution) => pollution.count),
      borderColor: getColor(item.type), // Helper function for random color
      fill: false,
    }));

    // Chart configuration
    const chartData = {
      labels: years,
      datasets: datasets,
    };
    setSelectedData(chartData);
  }, [selectedTypes]);

  return (
    <>
      <FormGroup>
        {data.filter(item => item.type !== "others").map((item) => (
          <FormControlLabel
            key={item.type}
            control={
              <Checkbox
                checked={selectedTypes.includes(item.type)}
                onChange={() => handleCheckboxChange(item.type)}
              />
            }
            label={item.type}
          />
        ))}
      </FormGroup>
      {selectedData &&
        <Line data={selectedData} options={options} />
      }
    </>
  );
}

export default PollutionLineChart;