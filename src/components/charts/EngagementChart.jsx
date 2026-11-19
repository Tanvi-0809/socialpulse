import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function EngagementChart({ data, period }) {
  return (
    <div className="chart-card engagement-chart">
      <div className="chart-header">
        <div>
          <h3>Engagement Overview</h3>
          <p>Track your audience interactions over time</p>
        </div>

        <span className="chart-badge">
          {period === "7" ? "Weekly" : period === "30" ? "Monthly" : "Quarterly"}
        </span>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 15, left: -15, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#F0EDF7"
            />

            <XAxis dataKey="day" />
            <YAxis />

            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="likes"
              name="Likes"
              stroke="#805AD5"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
            />

            <Line
              type="monotone"
              dataKey="comments"
              name="Comments"
              stroke="#E879B9"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

            <Line
              type="monotone"
              dataKey="shares"
              name="Shares"
              stroke="#38BFA7"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EngagementChart;