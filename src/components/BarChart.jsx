import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import '../dist/output.css';

function BarChart() {
    const [chartData, setChartData] = useState({
        datasets: []
    });

    const [loading, setLoading] = useState(false);

    const chart = async () => {
        let labelName = [];
        let labelTotal = [];

        await axios
            .get(
                'https://gateway.smart-cimb.com/v1/nocode/check/monitor-by-automation'
                // 'https://dummy.restapiexample.com/api/v1/employees'
            )
            .then((res) => {
                console.log({ res });
                for (const dataObj of res.data) {
                    // console.log({ dataObj });
                    labelName.push(dataObj.name);
                    labelTotal.push(dataObj.total);
                }
                setChartData({
                    labels: labelName,
                    datasets: [
                        {
                            label: 'Total',
                            data: labelTotal,
                            // backgroundColor: ['rgba(75, 192, 192, 0.6)'],
                            backgroundColor: [' rgb(37, 99, 235, 0.8)'],
                            // backgroundColor: ['#f46a9b'],
                            borderWidth: 1,
                            barWidth: 10,
                            // minBarLength: 20,
                            // barThickness: 20,
                            // barPercentage: 10,
                            // categoryPercentage: 20,

                            legend: {
                                position: 'bottom',
                                display: true
                            }
                        }
                    ]
                });
                setLoading(false);
            })
            .catch((err) => {
                console.log({ err });
            });
        console.log({ chartData, labelName });
    };

    // console.log({ chartData });
    useEffect(() => {
        chart();
        // console.log('update chart');
    }, []);

    const handleClick = () => {
        setLoading(true);
        chart();
    };

    // return <Bar data={chartData} />;
    return (
        <div className="App mt-3  flex flex-col justify-center">
            {/* <h1 className="text-center">Monitor by Automation</h1> */}
            <button
                className={`py-3 px-4 bg-blue-500 rounded text-white font-bold self-end hover:bg-blue-400 ${loading}`}
                onClick={handleClick}
                disabled={loading}
            >
                {/* Refresh */}
                {loading ? (
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                    ></div>
                ) : (
                    'Refresh'
                )}
            </button>
            <Bar
                data={chartData}
                options={{
                    scales: {
                        x: {
                            position: 'top'
                        },
                        y: {
                            beginAtZero: true
                            // ticks: {
                            //     // max: Math.max(...data.datasets[0].data) + 10,
                            //     display: false,
                            //     beginAtZero: true
                            // }
                        }
                    },

                    plugins: {
                        datalabels: {
                            anchor: 'end',
                            align: 'top',
                            formatter: Math.round,
                            font: {
                                weight: 'bold'
                            }
                        }
                    },

                    // backgroundColor: 'rgba(0, 0, 255, 0.8)',
                    // barPercentage: 0.9,
                    // barWidth: 20,
                    // maintainAspectRatio: false,
                    responsive: true,
                    indexAxis: 'y',
                    reverse: true
                }}
            />

            {/* <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
            ></div>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span> */}
        </div>
    );
}

export default BarChart;
