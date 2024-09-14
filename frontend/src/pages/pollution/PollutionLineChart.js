import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText, FormHelperText } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';

function PollutionLineChart({ data, selectedState }) {
  // const [selectedOptions, setSelectedOptions] = useState(data.filter(p => p.type !== "other").map((p) => p.type));
  // const [error, setError] = useState(false);
  const [selectedData, setSelectedData] = useState();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'top',
        // display: false, // Hide the legend
      },
      title: {
        display: true,
        text: "Top polymer type between 2021 and 2024",
      },
    },
    scales: {
      y: {
        // beginAtZero: true,
      },
    },
  };

  const years = ['2021', '2022', '2023', '2024'];

  // const ITEM_HEIGHT = 48;
  // const ITEM_PADDING_TOP = 8;
  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //       width: 250,
  //     },
  //   },
  // };

  // const handleSelection = (event) => {
  //   const { value } = event.target;

  //   if (value.length === 0) {
  //     setError(true);  // Show error if no options selected
  //   } else {
  //     setError(false);  // Clear error if options are selected
  //     setSelectedOptions(value);  // Update selected options
  //   }
  // };

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
    // const filteredData = data.filter((item) =>
    //   selectedOptions.includes(item.type)
    // );

    // const datasets = data.filter(p => p.type !== "other").map((item) => ({
    //   label: item.type,
    //   data: item.pollutions.map((pollution) => pollution.count),
    //   borderColor: getColor(item.type), // Helper function for random color
    //   fill: false,
    // }));

    // // Chart configuration
    // const chartData = {
    //   labels: years,
    //   datasets: datasets,
    // };
    // setSelectedData(chartData);
    const datasets = data.filter(p => p.state === selectedState)[0].pollutions.map((item) => ({
      label: item.type,
      data: item.data,
      borderColor: getColor(item.type), // Helper function for random color
      fill: false,
    }));

    // Chart configuration
    const chartData = {
      labels: years,
      datasets: datasets,
    };
    setSelectedData(chartData);
  }, [selectedState]);

  return (
    <>
      {/* <FormControl sx={{ m: 1, width: '90%' }} error={error}>
        <InputLabel id="multiple-checkbox-label">Plastic Type</InputLabel>
        <Select
          labelId="multi-select-label"
          id="multi-select"
          multiple
          value={selectedOptions}
          onChange={handleSelection}
          input={<OutlinedInput label="Plastic Type" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {data.filter(item => item.type !== "other").map((item, index) => (
            <MenuItem key={item.type} value={item.type}>
              <Checkbox checked={selectedOptions.indexOf(item.type) > -1} />
              <ListItemText primary={item.type} />
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>You must select at least one option</FormHelperText>}
      </FormControl> */}
      {selectedData &&
        <Line data={selectedData} options={options} />
      }
    </>
  );
}

export default PollutionLineChart;