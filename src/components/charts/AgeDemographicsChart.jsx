import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

import { ageData } from "../../data/audienceData";

function AgeDemographicsChart() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3>Age Demographics</h3>
          <p>Audience distribution by age group</p>
        </div>

        <span className="chart-badge">Age Groups</span>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={ageData}
            margin={{ top: 10, right: 10, left: -15, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#F0EDF7"
            />

            <XAxis
              dataKey="age"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              formatter={(value) => [`${value}%`, "Audience"]}
              cursor={{ fill: "#F8F5FF" }}
            />

            <Bar
              dataKey="audience"
              radius={[8, 8, 0, 0]}
              maxBarSize={55}
            >
              {ageData.map((entry, index) => (
                <Cell
                  key={entry.age}
                  fill={index === 0 ? "#805AD5" : "#C4B5FD"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AgeDemographicsChart;