import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { followerGrowthData } from "../../data/analyticsData";

function FollowerGrowthChart() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3>Follower Growth</h3>
          <p>How your audience has grown over time</p>
        </div>
        <span className="chart-badge">Last 6 Months</span>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={followerGrowthData}>
            <defs>
              <linearGradient id="followerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#805AD5"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="#805AD5"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#F0EDF7"
            />

            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="followers"
              stroke="#805AD5"
              strokeWidth={3}
              fill="url(#followerGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default FollowerGrowthChart;