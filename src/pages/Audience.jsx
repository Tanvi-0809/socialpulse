import { Users, UserPlus, TrendingUp } from "lucide-react";

import MetricCard from "../components/cards/MetricCard";
import AgeDemographicsChart from "../components/charts/AgeDemographicsChart";
import GenderDistributionChart from "../components/charts/GenderDistributionChart";
import TopLocations from "../components/charts/TopLocations";
import AudienceActivityChart from "../components/charts/AudienceActivityChart";

function Audience() {
  const audienceMetrics = [
    {
      title: "Total Followers",
      value: "24,580",
      growth: "+12.5%",
      icon: Users,
      color: "#805AD5",
    },
    {
      title: "New Followers",
      value: "2,180",
      growth: "+8.4%",
      icon: UserPlus,
      color: "#E879B9",
    },
    {
      title: "Follower Growth",
      value: "12.5%",
      growth: "+2.3%",
      icon: TrendingUp,
      color: "#38BFA7",
    },
  ];

  return (
    <div className="page-content audience-page">

      {/* Page Heading */}
      <div className="welcome-section">
        <div>
          <p className="eyebrow">KNOW YOUR AUDIENCE</p>
          <h1>Audience Insights</h1>
          <p className="subtitle">
            Understand your followers, demographics, and activity patterns.
          </p>
        </div>
      </div>

      {/* Audience Summary Cards */}
      <div className="audience-metrics-grid">
        {audienceMetrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            growth={metric.growth}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>

      {/* Demographics */}
      <div className="audience-section-heading">
        <h2>Audience Demographics</h2>
        <p>Explore the characteristics of your followers.</p>
      </div>

      <div className="audience-charts-grid">
        <AgeDemographicsChart />
        <GenderDistributionChart />
      </div>

      {/* Locations and Activity */}
      <div className="audience-section-heading">
        <h2>Audience Behaviour</h2>
        <p>Discover where your audience lives and when they're active.</p>
      </div>

      <div className="audience-charts-grid">
        <TopLocations />
        <AudienceActivityChart />
      </div>

    </div>
  );
}

export default Audience;