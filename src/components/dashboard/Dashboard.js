import React from 'react';
import SimpleChart from '../chart/SimpleChart';

function Dashboard() {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Ventas en USD',
        data: [100, 200, 300, 400, 500],
        fill: false,
        borderColor: '#007BFF',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <SimpleChart data={data} options={options} />
    </div>
  );
}

export default Dashboard;
