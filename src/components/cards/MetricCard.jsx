import { ArrowUpRight } from "lucide-react";

function MetricCard({ title, value, growth, icon: Icon, color }) {
  return (
    <div className="metric-card">
      <div className="metric-top">
        <div
          className="metric-icon"
          style={{
            backgroundColor: `${color}18`,
            color: color,
          }}
        >
          <Icon size={23} />
        </div>

        <span className="metric-growth">
          <ArrowUpRight size={15} />
          {growth}
        </span>
      </div>

      <div className="metric-info">
        <p>{title}</p>
        <h2>{value}</h2>
      </div>

      <p className="metric-footer">vs. previous period</p>
    </div>
  );
}

export default MetricCard;