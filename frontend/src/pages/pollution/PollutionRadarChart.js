import { Radar } from "react-chartjs-2"



function PollutionRadarChart() {

    const data = {
        labels: [
            'PETE',
            'HDPE',
            'PVC',
            'LDPE',
            'PP',
            'PS',
            'OTHER'
        ],
        datasets: [
            {
                label: 'Pollution type',
                data: [65, 59, 90, 81, 56, 55, 40],
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
        elements: {
            line: {
                borderWidth: 3
            }
        },
        scales: {
            r: {
                angleLines: {
                    display: false,
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
        plugins: {
            legend: {
                display: false, // Hide the legend
            }
        }
    };
    return (
        <>
            <Radar data={data} options={options} />
        </>
    );
}

export default PollutionRadarChart;