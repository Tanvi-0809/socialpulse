import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import { platformData } from "../../data/analyticsData";

function PlatformChart({ selectedPlatform = "All" }) {
  const filteredData =
    selectedPlatform === "All"
      ? platformData
      : platformData.filter(
          (item) => item.name === selectedPlatform
        );

  return (
    <div className="chart-card platform-chart">
      <div className="chart-header">
        <div>
          <h3>Platform Distribution</h3>
          <p>
            {selectedPlatform === "All"
              ? "Engagement across your platforms"
              : `Viewing ${selectedPlatform} engagement share`}
          </p>
        </div>
      </div>

      <div className="donut-container">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={platformData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
              nameKey="name"
            >
              {platformData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={
                    selectedPlatform === "All" ||
                    selectedPlatform === entry.name
                      ? entry.color
                      : "#EEEAF5"
                  }
                  stroke="none"
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => `${value}%`}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #F0EDF7",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="platform-legend">
        {filteredData.map((item) => (
          <div className="platform-item" key={item.name}>
            <div className="platform-name">
              <span
                className="platform-dot"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
            </div>

            <strong>{item.value}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlatformChart;