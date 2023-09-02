import React from 'react';
import { Line } from 'react-chartjs-2';
import './simpleChart.css';

const SimpleChart = ({ data, options }) => {
  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default SimpleChart;
