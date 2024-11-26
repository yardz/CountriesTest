'use client';

import styles from './Population.module.scss';

import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { useMemo } from 'react';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

interface PopulationCount {
  year: number;
  value: number;
}
interface Props {
  population: PopulationCount[];
}

const generateChartData = (population: PopulationCount[]) => {
  const data: number[] = [];
  const labels: string[] = [];

  population.forEach((pop) => {
    data.push(pop.value);
    labels.push(pop.year.toString());
  });

  return {
    labels,
    datasets: [
      {
        label: 'Populational Data',
        data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
};

export const Population = ({ population }: Props) => {
  const cartData = useMemo(() => generateChartData(population), [population]);

  if (!population.length) {
    return <div>No population data</div>;
  }
  return (
    <div className={styles.PopulationChart}>
      <Line data={cartData} />
    </div>
  );
};
