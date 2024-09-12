import { useEffect, useRef } from "react";
import { Radar } from "react-chartjs-2"



function PollutionRadarChart({ data, selectedState, handlePollutionTypeChange }) {
    const chartRef = useRef(null);
    const radarData = {
        // labels: [
        //     'PETE',
        //     'HDPE',
        //     'PVC',
        //     'LDPE',
        //     'PP',
        //     'PS',
        //     'OTHER'
        // ],
        labels: data.find(item => item.state === selectedState).pollutions.map(item => item.type),
        datasets: [
            {
                label: 'Number of plastic pollution',
                // data: [65, 59, 90, 81, 56, 55, 40],
                data: data.find(item => item.state === selectedState).pollutions.map(item => item.count),
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }
        ],
    };
    const options = {
        responsive: true,
        elements: {
            line: {
                borderWidth: 2
            }
        },
        scales: {
            r: {
                // angleLines: {
                //     display: false,
                // },
                pointLabels: {
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                }
            },
        },
        onClick: (event) => {
            const chart = chartRef.current;
            if (!chart) return;

            // Get the elements at the event (on click)
            const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

            if (points.length) {
                const firstPoint = points[0];
                const label = chart.data.labels[firstPoint.index];
                // const datasetLabel = chart.data.datasets[firstPoint.datasetIndex].label;
                // const value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];

                // alert(`You clicked on: \nLabel: ${label}, \nDataset: ${datasetLabel}, \nValue: ${value}`);
                handlePollutionTypeChange(label);
            }
        },
        plugins: {
            legend: {
                display: false, // Hide the legend
            }
        }
    };
    return (
        <>
            <Radar ref={chartRef} data={radarData} options={options} />
        </>
    );
}

export default PollutionRadarChart;