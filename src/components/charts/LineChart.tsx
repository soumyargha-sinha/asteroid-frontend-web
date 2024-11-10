import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import styles from './Chart.module.css';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface LineChartProps {
    data1: number[];
    data2: number[];
    label1: string;
    label2: string;
    days: string[];
}

const LineChart: React.FC<LineChartProps> = ({ data1, data2, label1, label2, days }) => {
    const [showLine1, setShowLine1] = useState(true);
    const [showLine2, setShowLine2] = useState(true);
    const data = {
        labels: days,
        datasets: [
            {
                label: label1,
                data: data1,
                borderColor: '#FF6384',
                borderWidth: 2,
                fill: false,
                hidden: !showLine1,
            },
            {
                label: label2,
                data: data2,
                borderColor: '#36A2EB',
                borderWidth: 2,
                fill: false,
                hidden: !showLine2,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                align: 'center',
                labels: {
                    color: '#4D4D4D',
                    font: {
                        size: 12,
                        weight: 'bold',
                    },
                    boxHeight: 10,
                    padding: 10,
                    boxWidth: 20,
                },
            },

            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        layout: {
            padding: {
                top: -10,
                bottom: 10
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: true,
                grid: {
                    display: true,
                    color: '#2a3239',
                    lineWidth: 1,
                },
            },
        },
    };

    return (
        <div className={styles["chart-container"]} style={{ width: '100%', height: '100%' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
