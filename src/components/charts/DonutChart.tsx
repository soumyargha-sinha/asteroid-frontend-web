import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';
import styles from './Chart.module.css';

const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(chart: any) {
        const { width, height, ctx, options } = chart;
        const text = options.plugins.centerText?.text || '';

        ctx.save();
        ctx.font = '3rem sans-serif';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#FFF';

        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.restore();
    },
};

ChartJS.register(ArcElement, Tooltip, Legend, Title, centerTextPlugin);

interface DonutChartProps {
    dataValues: number[];
    labels: string[];
    centerText: string;
    backgroundColors?: string[];
    borderColors?: string[];
}

const DonutChart: React.FC<DonutChartProps> = ({
    dataValues,
    labels,
    centerText,
    backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#ABCDE4', '#9A60C0', '#4BC0C5'],
    borderColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#ABCDE4', '#9A60C0', '#4BC0C5'],
}) => {
    const data = {
        labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2,
                hoverOffset: 10,
                hoverBackgroundColor: backgroundColors.map(color => color + 'CC'),
            },
        ],
    };

    const options: any = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false,
                position: 'right' as const,
                labels: {
                    color: '#333',
                    font: {
                        size: '14px',
                        weight: 'bold',
                    },
                    padding: 20,
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                },
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleColor: '#FFF',
                bodyColor: '#FFF',
                displayColors: false,
            },
            title: {
                display: false,
                text: 'Custom Donut Chart',
                font: {
                    size: 20,
                    weight: 'bold',
                },
                color: '#333',
            },
            centerText: {
                text: centerText,
            },
        },
        cutout: '75%',
        animation: {
            animateRotate: true,
            animateScale: true,
        },
    };

    return (<div className={styles["chart-container"]} style={{ width: '90%', height: '100%' }}>
        <Doughnut data={data} options={options} />
    </div>);
};

export default DonutChart;
