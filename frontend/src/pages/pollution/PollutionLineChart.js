import { Line } from "react-chartjs-2";
function PollutionLineChart() {
  const data = {
    labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      //   {
      //     label: 'Dataset 2',
      //     data: [28, 48, 40, 19, 86, 27, 90],
      //     fill: false,
      //     borderColor: 'rgba(153, 102, 255, 1)',
      //     tension: 0.1,
      //   },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'top',
        display: false, // Hide the legend
      },
      // title: {
      //   display: true,
      //   text: 'Line Chart Example',
      // },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <>
      <Line data={data} options={options} />
      {/* <Line data={data} /> */}
    </>
  );
}

export default PollutionLineChart;