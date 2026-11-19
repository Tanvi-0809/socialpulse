import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import { genderData } from "../../data/audienceData";

function GenderDistributionChart() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3>Gender Distribution</h3>
          <p>Understand your audience demographics</p>
        </div>

        <span className="chart-badge">Audience</span>
      </div>

      <div className="donut-container">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={genderData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              stroke="none"
            >
              {genderData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => `${value}%`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="platform-legend">
        {genderData.map((item) => (
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

export default GenderDistributionChart;