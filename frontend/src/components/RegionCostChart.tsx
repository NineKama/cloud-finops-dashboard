import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  import { RegionCost } from "../types";
  
  type Props = {
    data: RegionCost[];
  };
  
  export default function RegionCostChart({ data }: Props) {
    const aggregated = data.reduce((acc, item) => {
      const existing = acc.find(i => i.region === item.region);
      if (existing) {
        existing.cost += item.cost;
      } else {
        acc.push({ region: item.region, cost: item.cost });
      }
      return acc;
    }, [] as { region: string; cost: number }[]);
  
    aggregated.sort((a, b) => b.cost - a.cost);
  
    return (
      <div style={{ width: "100%", height: 30 * aggregated.length }}>
        <h2>🌍 Total Cost by Region (7 Days)</h2>
        <ResponsiveContainer>
          <BarChart
            layout="vertical"
            data={aggregated}
            margin={{ left: 100, right: 30, top: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" stroke="#ccc" />
            <YAxis type="category" dataKey="region" stroke="#ccc" width={180} />
            <Tooltip
              formatter={(value: number) => `$${value.toFixed(4)}`}
              contentStyle={{ backgroundColor: "#333", color: "#fff" }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar dataKey="cost" fill="#4ade80" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  