import { useState } from "react";

import {
  TrendingUp,
  Users,
  Heart,
  Activity,
  Eye,
} from "lucide-react";

import MetricCard from "../components/cards/MetricCard";
import EngagementChart from "../components/charts/EngagementChart";
import PlatformChart from "../components/charts/PlatformChart";

import { usePosts } from "../context/PostsContext";

import {
  engagementData,
  monthlyEngagementData,
  quarterlyEngagementData,
  platformAnalytics,
} from "../data/analyticsData";

function Overview() {
  // Shared post data from React Context
  const { posts } = usePosts();

  // Dashboard filters
  const [period, setPeriod] = useState("30");
  const [platform, setPlatform] = useState("All");

  // Select existing sample chart data based on date range
  const baseData =
    period === "7"
      ? engagementData
      : period === "30"
      ? monthlyEngagementData
      : quarterlyEngagementData;

  // Keep the existing engagement chart behavior
  const chartData = baseData.map((item) => {
    const weight =
      platform === "All"
        ? 1
        : platformAnalytics[platform]?.weight ?? 1;

    return {
      ...item,
      likes: Math.round(item.likes * weight),
      comments: Math.round(item.comments * weight),
      shares: Math.round(item.shares * weight),
    };
  });

  // Calculate date range
  const today = new Date();
  const startDate = new Date();

  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(today.getDate() - Number(period) + 1);

  // Match Twitter posts with the X platform filter
  const matchesPlatform = (post) => {
    if (platform === "All") return true;

    if (platform === "X") {
      return post.platform === "Twitter" || post.platform === "X";
    }

    return post.platform === platform;
  };

  // Filter published posts by platform and date
  const filteredPosts = posts.filter((post) => {
    if (post.status !== "Published") return false;

    if (!matchesPlatform(post)) return false;

    if (!post.date) return false;

    const postDate = new Date(`${post.date}T12:00:00`);

    return (
      !Number.isNaN(postDate.getTime()) &&
      postDate >= startDate &&
      postDate <= today
    );
  });

  // Calculate actual post statistics
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

  const totalEngagement =
    totalLikes + totalComments + totalShares;

  const engagementRate =
    totalReach > 0
      ? ((totalEngagement / totalReach) * 100).toFixed(1)
      : "0.0";

  // Followers still come from existing audience sample data
  const allPlatforms = Object.values(platformAnalytics);

  const totalFollowers = allPlatforms.reduce(
    (sum, item) => sum + item.followers,
    0
  );

  const selectedAnalytics =
    platform === "All" ? null : platformAnalytics[platform];

  const followers = selectedAnalytics
    ? selectedAnalytics.followers
    : totalFollowers;

  const growth = selectedAnalytics
    ? selectedAnalytics.growth
    : 12.5;

  // Dynamic dashboard cards
  const metrics = [
    {
      title: "Total Followers",
      value: followers.toLocaleString(),
      growth: `+${growth}%`,
      icon: Users,
      color: "#805ad5",
    },
    {
      title: "Total Likes",
      value: totalLikes.toLocaleString(),
      growth: "Published posts",
      icon: Heart,
      color: "#ec4899",
    },
    {
      title: "Engagement Rate",
      value: `${engagementRate}%`,
      growth: "Based on reach",
      icon: Activity,
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
          <p className="eyebrow">YOUR DASHBOARD</p>

          <h1>Overview</h1>

          <p className="subtitle">
            Welcome back! Here's what's happening with your social media.
          </p>
        </div>

        {/* DASHBOARD FILTERS */}

        <div className="dashboard-filters">

          <select
            className="date-selector"
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
            aria-label="Select social media platform"
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
            aria-label="Select analytics date range"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>

        </div>
      </div>

      {/* WELCOME BANNER */}

      <div className="welcome-banner">
        <div>
          <p>YOUR PERFORMANCE AT A GLANCE</p>

          <h2>Let's grow your social presence ✨</h2>

          <span>
            Track your performance, discover insights, and create
            content that connects with your audience.
          </span>
        </div>

        <div className="banner-icon">
          <TrendingUp size={65} />
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

      {/* EXISTING CHARTS */}

      <div className="charts-grid">
        <EngagementChart
          data={chartData}
          period={period}
        />

        <PlatformChart selectedPlatform={platform} />
      </div>

    </div>
  );
}

export default Overview;