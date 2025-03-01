
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceComparisonProps {
  data: {
    depositAccount: number;
    traditionalRealEstate: number;
    etfReit: number;
  };
  currentYield: number;
}

const PerformanceComparison: React.FC<PerformanceComparisonProps> = ({ data, currentYield }) => {
  const chartData = [
    { name: 'Jungle Rent SFP', value: currentYield },
    { name: 'Conto Deposito', value: data.depositAccount },
    { name: 'Immobiliare Tradizionale', value: data.traditionalRealEstate },
    { name: 'ETF REIT', value: data.etfReit },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8B5CF6" name="Rendimento %" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceComparison;
