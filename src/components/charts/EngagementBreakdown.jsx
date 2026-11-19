import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import { engagementBreakdownData } from "../../data/analyticsData";

function EngagementBreakdown() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3>Engagement Breakdown</h3>
          <p>Distribution of audience interactions</p>
        </div>
      </div>

      <div className="donut-container">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={engagementBreakdownData}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
            >
              {engagementBreakdownData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                  stroke="none"
                />
              ))}
            </Pie>

            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="platform-legend">
        {engagementBreakdownData.map((item) => (
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

export default EngagementBreakdown;