import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useState } from 'react';
import { ServiceCost } from '../types';

type Props = {
  data: ServiceCost[];
};

export default function ServiceCostChart({ data }: Props) {
  const aggregated = data.reduce((acc, item) => {
    const existing = acc.find(i => i.service === item.service);
    const cost = item.cost;
    if (existing) {
      existing.cost += cost;
    } else {
      acc.push({ service: item.service, cost });
    }
    return acc;
  }, [] as { service: string; cost: number }[]);

  aggregated.sort((a, b) => b.cost - a.cost);

  const serviceNames = aggregated.map(item => item.service);

  const [visibleServices, setVisibleServices] = useState<string[]>(serviceNames);

  const handleToggle = (service: string) => {
    setVisibleServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const filtered = aggregated.filter(item => visibleServices.includes(item.service));

  return (
    <div style={{ width: '100%', marginTop: '2rem' }}>
      <h2>Total Cost by Service (7 Days)</h2>

      <div style={{ width: '100%', height: 30 * filtered.length }}>
        <ResponsiveContainer>
          <BarChart
            layout="vertical"
            data={filtered}
            margin={{ left: 100, right: 30, top: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" stroke="#ccc" />
            <YAxis type="category" dataKey="service" stroke="#ccc" width={180} />
            <Tooltip
              formatter={(value: number) => `$${value.toFixed(4)}`}
              contentStyle={{ backgroundColor: "#333", color: "#fff" }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar dataKey="cost" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {serviceNames.map(service => (
          <label key={service} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <input
              type="checkbox"
              checked={visibleServices.includes(service)}
              onChange={() => handleToggle(service)}
            />
            {service}
          </label>
        ))}
      </div>
    </div>
  );
}
