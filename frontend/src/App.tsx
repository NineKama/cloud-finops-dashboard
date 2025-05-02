import { useState } from "react";
import DailyCostChart from "./components/DailyCostChart";
import ServiceCostChart from "./components/ServiceCostChart";
import RegionCostChart from "./components/RegionCostChart";
import { fetchDailyCosts, fetchCostsByService, fetchCostsByRegion } from "./services/api";
import { DailyCost, RegionCost, ServiceCost } from "./types";
import { useEffect } from "react";

export default function App() {
  const [daily, setDaily] = useState<DailyCost[]>([]);
  const [service, setService] = useState<ServiceCost[]>([]);
  const [region, setRegion] = useState<RegionCost[]>([]); 
  const [selectedView, setSelectedView] = useState<"daily" | "service" | "region">("daily");

  useEffect(() => {
    fetchDailyCosts().then(setDaily);
    fetchCostsByService().then(setService);
    fetchCostsByRegion().then(setRegion);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Sidebar menu */}
      <div
        style={{
          width: "200px",
          backgroundColor: "#111827",
          color: "#fff",
          padding: "1rem",
        }}
      >
        <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>📊 Views</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
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
        {selectedView === "daily" && <DailyCostChart data={daily} />}
        {selectedView === "service" && <ServiceCostChart data={service} />}
        {selectedView === "region" && <RegionCostChart data={region} />}
      </div>
    </div>
  );
}
