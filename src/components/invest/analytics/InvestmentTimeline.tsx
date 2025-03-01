
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimelineProps {
  data: Array<{
    date: string;
    jungleRent: number;
    investors: number;
  }>;
}

const InvestmentTimeline: React.FC<TimelineProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="investors" stroke="#22C55E" name="Investitori %" />
        <Line type="monotone" dataKey="jungleRent" stroke="#8B5CF6" name="Jungle Rent %" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default InvestmentTimeline;
