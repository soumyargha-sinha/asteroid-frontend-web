import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Units } from '../../interfaces/Units';
import { asteroidConstants } from '../../config/AsteroidConstants';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

type Props = {
  asteroids: any[];
  units: Units;
};

const DistanceVelocityScatterPlot: React.FC<Props> = React.memo(({ asteroids, units }: { asteroids: any[], units: Units }) => {
  const hazardousData = asteroids.flatMap(asteroid =>
    asteroid.is_potentially_hazardous_asteroid
      ? asteroid.close_approach_data.map((data: any) => ({
        x: parseFloat(data.miss_distance[units?.missDistance ?? asteroidConstants.defaultUnitValues.defaultMissDistance]),
        y: parseFloat(data.relative_velocity[units?.velocity ?? asteroidConstants.defaultUnitValues.defaultVelocityUnit]),
      }))
      : []
  );

  const nonHazardousData = asteroids.flatMap(asteroid =>
    !asteroid.is_potentially_hazardous_asteroid
      ? asteroid.close_approach_data.map((data: any) => ({
        x: parseFloat(data.miss_distance[units?.missDistance ?? asteroidConstants.defaultUnitValues.defaultMissDistance]),
        y: parseFloat(data.relative_velocity[units?.velocity ?? asteroidConstants.defaultUnitValues.defaultVelocityUnit]),
      }))
      : []
  );

  const data = {
    datasets: [
      {
        label: 'Hazardous Asteroids',
        data: hazardousData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointRadius: 3,
      },
      {
        label: 'Non-Hazardous Asteroids',
        data: nonHazardousData,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointRadius: 3,
      }
    ]
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Distance vs. Velocity of Asteroids on Close Approach',
        font: {
          size: 18
        }
      }
    },
    scales: {
      x: {
        type: 'linear' as const,
        title: {
          display: true,
          text: `Miss Distance (${asteroidConstants.unitShorthands[units?.missDistance ?? asteroidConstants.defaultUnitValues.defaultMissDistance]})`
        },
        min: 0,
        ticks: {
          callback: (value: number) => {
            if (value >= 1000) {
              return `${value / 1000}k`;
            }
            return value.toString();
          }
        }
      },
      y: {
        type: 'linear' as const,
        title: {
          display: true,
          text: `Relative Velocity (${asteroidConstants.unitShorthands[units?.velocity ?? asteroidConstants.defaultUnitValues.defaultVelocityUnit]})`,
        },
        min: 0
      }
    }
  };

  return (
    <div>
      <Scatter data={data} options={options} />
    </div>
  );
});

export default DistanceVelocityScatterPlot;
