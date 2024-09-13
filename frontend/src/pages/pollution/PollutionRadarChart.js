import { useEffect, useRef } from "react";
import { Radar } from "react-chartjs-2"



function PollutionRadarChart({ data, selectedState, handlePollutionTypeChange }) {
    const getLabelIndex = (x, y, pointsLabelItems) => {
        // console.log(pointsLabelItems);
        // console.log(x, y);
        let index = -1;
        pointsLabelItems.forEach((element, i) => {
            const {bottom, top, left, right} = element;
            // console.log(left, right, bottom, top)
            // console.log(x <= right)
            // console.log(x >= left)
            // console.log(y >= top)
            // console.log(y <= bottom)

            // console.log(typeof(bottom))
            if (x <= right && x >= left && y >= top && y <= bottom) {
                // console.log(element);
                // return i;
                index = i;
            }
        });
        return index;
    };
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

            const { ctx, scales: { r } } = chart;

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