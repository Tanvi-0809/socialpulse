import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { activityData } from "../../data/audienceData";

function AudienceActivityChart() {
  const peakTime = activityData.reduce((highest, current) =>
    current.active > highest.active ? current : highest
  );

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3>Audience Activity</h3>
          <p>Discover when your followers are most active</p>
        </div>

        <span className="chart-badge">
          Peak: {peakTime.time}
        </span>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={activityData}
            margin={{ top: 10, right: 10, left: -15, bottom: 5 }}
          >
            <defs>
              <linearGradient
                id="activityGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#E879B9"
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor="#E879B9"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#F0EDF7"
            />

            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              formatter={(value) => [
                value.toLocaleString(),
                "Active Followers",
              ]}
            />

            <Area
              type="monotone"
              dataKey="active"
              stroke="#E879B9"
              strokeWidth={3}
              fill="url(#activityGradient)"
              activeDot={{ r: 6, fill: "#E879B9" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="activity-insight">
        <span>✨</span>
        <p>
          Your audience is most active at{" "}
          <strong>{peakTime.time}</strong>. Consider scheduling
          important posts around this time.
        </p>
      </div>
    </div>
  );
}

export default AudienceActivityChart;