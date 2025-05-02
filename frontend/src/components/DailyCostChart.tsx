import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { DailyCost } from '../types';

type Props = {
  data: DailyCost[];
};

export default function DailyCostChart({ data }: Props) {
  return (
    <div style={{ width: '100%', height: 300, marginBottom: '2rem' }}>
      <h2>📅 Daily AWS Cost</h2>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="cost" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
