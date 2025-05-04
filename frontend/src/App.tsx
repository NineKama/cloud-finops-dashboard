import { useState, useEffect } from "react";
import DailyCostChart from "./components/DailyCostChart";
import ServiceCostChart from "./components/ServiceCostChart";
import RegionCostChart from "./components/RegionCostChart";
import { fetchCostSummary } from "./services/api";
import { CostSummary } from "./types";

export default function App() {
  const [summary, setSummary] = useState<CostSummary>({
    by_region: [],
    by_service: [],
    daily: [],
  });

  const [selectedView, setSelectedView] = useState<"daily" | "service" | "region" | "summary">("summary");

  useEffect(() => {
    fetchCostSummary().then(setSummary);
  }, []);

  const totalCost = summary.daily.reduce((acc, item) => acc + item.cost, 0);

  const serviceTotals: Record<string, number> = {};
  summary.by_service.forEach((item) => {
    serviceTotals[item.service] = (serviceTotals[item.service] || 0) + item.cost;
  });

  const top3Services = Object.entries(serviceTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Sidebar menu */}
      <div style={{ width: "200px", backgroundColor: "#111827", color: "#fff", padding: "1rem" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>📊 Views</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            style={{
              marginBottom: "1rem",
              cursor: "pointer",
              fontWeight: selectedView === "summary" ? "bold" : "normal",
            }}
            onClick={() => setSelectedView("summary")}
          >
            📈 Summary
          </li>
          <li
            style={{
              marginBottom: "1rem",
              cursor: "pointer",
              fontWeight: selectedView === "daily" ? "bold" : "normal",
            }}
            onClick={() => setSelectedView("daily")}
          >
            📅 Daily Cost
          </li>
          <li
            style={{
              marginBottom: "1rem",
              cursor: "pointer",
              fontWeight: selectedView === "service" ? "bold" : "normal",
            }}
            onClick={() => setSelectedView("service")}
          >
            🧩 Service Cost
          </li>
          <li
            style={{
              cursor: "pointer",
              fontWeight: selectedView === "region" ? "bold" : "normal",
            }}
            onClick={() => setSelectedView("region")}
          >
            🌍 Region Cost
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "2rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "2rem", color: "#2563eb" }}>
          🌤️ Cloud FinOps Dashboard
        </h1>

        {selectedView === "summary" && (
          <div>
            <h2>Total 7-Day Cost: ${totalCost.toFixed(2)}</h2>

            <h3 style={{ marginTop: "2rem" }}>🏆 Top 3 Services</h3>
            <ul>
              {top3Services.map(([service, cost]) => (
                <li key={service}>
                  {service}: ${cost.toFixed(2)}
                </li>
              ))}
            </ul>

            <h3 style={{ marginTop: "2rem" }}>🌍 Region Breakdown</h3>
            <ul>
              {summary.by_region.map((region, i) => (
                <li key={i}>
                  {region.region}: ${region.cost.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedView === "daily" && <DailyCostChart data={summary.daily} />}
        {selectedView === "service" && <ServiceCostChart data={summary.by_service} />}
        {selectedView === "region" && <RegionCostChart data={summary.by_region} />}
      </div>
    </div>
  );
}
