import { usePosts } from "../../context/PostsContext";

function TopPostsTable({ platform = "All", period = "30" }) {
  const { posts } = usePosts();

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

  // Rank posts by total engagement
  const topPosts = filteredPosts
    .map((post) => ({
      ...post,
      engagement:
        (Number(post.likes) || 0) +
        (Number(post.comments) || 0) +
        (Number(post.shares) || 0),
    }))
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, 5);

  return (
    <div className="chart-card top-posts-card">
      <div className="chart-header">
        <div>
          <h3>Top Performing Posts</h3>
          <p>Your most engaging content</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="posts-table">
          <thead>
            <tr>
              <th>Post</th>
              <th>Platform</th>
              <th>Date</th>
              <th>Likes</th>
              <th>Comments</th>
              <th>Shares</th>
            </tr>
          </thead>

          <tbody>
            {topPosts.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    textAlign: "center",
                    padding: "30px",
                    color: "#8A8498",
                  }}
                >
                  No published posts found for this selection.
                </td>
              </tr>
            ) : (
              topPosts.map((post) => (
                <tr key={post.id}>
                  <td className="post-title">
                    {post.caption}
                  </td>

                  <td>
                    <span className="platform-tag">
                      {post.platform}
                    </span>
                  </td>

                  <td>{post.date}</td>

                  <td>
                    {(Number(post.likes) || 0).toLocaleString()}
                  </td>

                  <td>
                    {(Number(post.comments) || 0).toLocaleString()}
                  </td>

                  <td>
                    {(Number(post.shares) || 0).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopPostsTable;