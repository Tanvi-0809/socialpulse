import { useState } from "react";

import {
  Heart,
  MessageCircle,
  Share2,
  Eye,
} from "lucide-react";

import MetricCard from "../components/cards/MetricCard";
import FollowerGrowthChart from "../components/charts/FollowerGrowthChart";
import PostPerformanceChart from "../components/charts/PostPerformanceChart";
import EngagementBreakdown from "../components/charts/EngagementBreakdown";
import TopPostsTable from "../components/tables/TopPostsTable";

// API component
import LiveFeed from "../components/api/LiveFeed";

import { usePosts } from "../context/PostsContext";

function Analytics() {
  const { posts } = usePosts();

  // Shared analytics filters
  const [platform, setPlatform] = useState("All");
  const [period, setPeriod] = useState("30");

  // Calculate selected date range
  const today = new Date();
  const startDate = new Date();

  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(today.getDate() - Number(period) + 1);

  // Filter published posts
  const filteredPosts = posts.filter((post) => {
    if (post.status !== "Published" || !post.date) {
      return false;
    }

    const matchesPlatform =
      platform === "All" ||
      post.platform === platform ||
      (platform === "X" && post.platform === "Twitter");

    if (!matchesPlatform) {
      return false;
    }

    const postDate = new Date(`${post.date}T12:00:00`);

    return (
      !Number.isNaN(postDate.getTime()) &&
      postDate >= startDate &&
      postDate <= today
    );
  });

  // Calculate metrics
  const totalLikes = filteredPosts.reduce(
    (sum, post) => sum + (Number(post.likes) || 0),
    0
  );

  const totalComments = filteredPosts.reduce(
    (sum, post) => sum + (Number(post.comments) || 0),
    0
  );

  const totalShares = filteredPosts.reduce(
    (sum, post) => sum + (Number(post.shares) || 0),
    0
  );

  const totalReach = filteredPosts.reduce(
    (sum, post) => sum + (Number(post.reach) || 0),
    0
  );

  const metrics = [
    {
      title: "Total Likes",
      value: totalLikes.toLocaleString(),
      growth: "Published posts",
      icon: Heart,
      color: "#ec4899",
    },
    {
      title: "Total Comments",
      value: totalComments.toLocaleString(),
      growth: "Published posts",
      icon: MessageCircle,
      color: "#805ad5",
    },
    {
      title: "Total Shares",
      value: totalShares.toLocaleString(),
      growth: "Published posts",
      icon: Share2,
      color: "#10b981",
    },
    {
      title: "Total Reach",
      value: totalReach.toLocaleString(),
      growth: "Published posts",
      icon: Eye,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="overview-page">

      {/* PAGE HEADER */}

      <div className="welcome-section">
        <div>
          <p className="eyebrow">PERFORMANCE INSIGHTS</p>

          <h1>Analytics</h1>

          <p className="subtitle">
            Explore your audience growth and content performance.
          </p>
        </div>

        {/* FILTERS */}

        <div className="dashboard-filters">
          <select
            className="date-selector"
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
            aria-label="Select platform"
          >
            <option value="All">All Platforms</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="X">X</option>
          </select>

          <select
            className="date-selector"
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            aria-label="Select date range"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* METRIC CARDS */}

      <div className="metrics-grid">
        {metrics.map((metric) => (
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

      {/* ANALYTICS CHARTS */}

      <div className="charts-grid">
        <FollowerGrowthChart />

        <PostPerformanceChart
          platform={platform}
          period={period}
        />
      </div>

      {/* ENGAGEMENT BREAKDOWN */}

      <div className="analytics-bottom-grid">
        <EngagementBreakdown
          platform={platform}
          period={period}
        />
      </div>

      {/* TOP PERFORMING POSTS */}

      <TopPostsTable
        platform={platform}
        period={period}
      />

      {/* EXTERNAL API DEMONSTRATION */}

      <div style={{ marginTop: "24px" }}>
        <LiveFeed />
      </div>

    </div>
  );
}

export default Analytics;