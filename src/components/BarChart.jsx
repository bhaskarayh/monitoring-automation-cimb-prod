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
    const [totalAutomation, setTotalAutomation] = useState(0);
    const [totalProcess, setTotalProcess] = useState(0);

    const chart = async () => {
        let labelName = [];
        let labelTotal = [];
        let tempProcess = 0;

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
                    tempProcess += dataObj.total || 0;
                }
                setChartData({
                    labels: labelName,
                    datasets: [
                        {
                            label: 'Total',
                            data: labelTotal,
                            backgroundColor: [' rgb(37, 99, 235, 0.8)'],
                            borderWidth: 1,
                            barWidth: 10,
                            legend: {
                                position: 'bottom',
                                display: true
                            },
                            plugins: {
                                datalabels: {
                                    anchor: 'end'
                                }
                            }
                        }
                    ]
                });
                setLoading(false);
                setTotalProcess(tempProcess);
                setTotalAutomation(labelTotal.length);
            })
            .catch((err) => {
                console.log({ err });
            });
    };

    useEffect(() => {
        chart();
    }, []);

    const handleClick = () => {
        setLoading(true);
        chart();
    };

    return (
        <div className="App mt-3  flex flex-col justify-center">
            <div className="flex flex-row justify-end gap-10 items-center mb-3 bg-dark">
                <p>Automation: {totalAutomation.toLocaleString()}</p>
                <p>Total Process: {totalProcess.toLocaleString()}</p>
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
            </div>
            <Bar
                data={chartData}
                options={{
                    scales: {
                        x: {
                            position: 'top'
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true
                            }
                        }
                    },

                    plugins: {
                        datalabels: {
                            anchor: 'end',
                            align: 'end',
                            formatter: Math.round,
                            font: {
                                weight: 'bold'
                            }
                        },
                        legend: {
                            display: false
                        }
                    },
                    responsive: true,
                    indexAxis: 'y',
                    reverse: true
                }}
            />
        </div>
    );
}

export default BarChart;
