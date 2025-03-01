
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DistributionChartProps {
  data: {
    jungleRent: number;
    investors: number;
  };
}

const COLORS = ['#8B5CF6', '#22C55E'];

const DistributionChart: React.FC<DistributionChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Jungle Rent', value: data.jungleRent },
    { name: 'Investitori', value: data.investors },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DistributionChart;
