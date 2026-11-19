import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { usePosts } from "../../context/PostsContext";

function PostPerformanceChart({ platform = "All", period = "30" }) {
  const { posts } = usePosts();

  // Calculate date range
  const today = new Date();
  const startDate = new Date();

  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(today.getDate() - Number(period) + 1);

  // Filter published posts
  const filteredPosts = posts.filter((post) => {
    if (post.status !== "Published") {
      return false;
    }

    const matchesPlatform =
      platform === "All" ||
      post.platform === platform ||
      (platform === "X" && post.platform === "Twitter");

    if (!matchesPlatform || !post.date) {
      return false;
    }

    const postDate = new Date(`${post.date}T12:00:00`);

    return (
      !Number.isNaN(postDate.getTime()) &&
      postDate >= startDate &&
      postDate <= today
    );
  });

  // Prepare chart data
  const chartData = filteredPosts
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((post, index) => ({
      name: `Post ${index + 1}`,
      likes: Number(post.likes) || 0,
      comments: Number(post.comments) || 0,
      shares: Number(post.shares) || 0,
      caption: post.caption,
    }));

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3>Post Performance</h3>
          <p>Compare likes, comments, and shares</p>
        </div>
      </div>

      <div className="chart-container">
        {chartData.length === 0 ? (
          <div
            style={{
              height: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#8A8498",
              textAlign: "center",
              padding: 20,
            }}
          >
            No published posts found for this selection.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#F0EDF7"
              />

              <XAxis dataKey="name" />
              <YAxis />

              <Tooltip />
              <Legend />

              <Bar
                dataKey="likes"
                name="Likes"
                fill="#805AD5"
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="comments"
                name="Comments"
                fill="#E879B9"
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="shares"
                name="Shares"
                fill="#38BFA7"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default PostPerformanceChart;