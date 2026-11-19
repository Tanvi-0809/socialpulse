import {
  Camera,
  Users,
  BriefcaseBusiness,
  MessageSquare,
  Heart,
  MessageCircle,
  Share2,
  Eye,
} from "lucide-react";

function PostsTable({ posts }) {
  const platformIcons = {
    Instagram: Camera,
    Facebook: Users,
    LinkedIn: BriefcaseBusiness,
    Twitter: MessageSquare,
  };

  const platformColors = {
    Instagram: "#E879B9",
    Facebook: "#1877F2",
    LinkedIn: "#0A66C2",
    Twitter: "#25243A",
  };

  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  return (
    <div className="posts-table-card">
      <div className="posts-table-wrapper">
        <table className="posts-table">
          <thead>
            <tr>
              <th>Post</th>
              <th>Platform</th>
              <th>Date</th>
              <th>Status</th>
              <th>
                <Heart size={15} /> Likes
              </th>
              <th>
                <MessageCircle size={15} /> Comments
              </th>
              <th>
                <Share2 size={15} /> Shares
              </th>
              <th>
                <Eye size={15} /> Reach
              </th>
            </tr>
          </thead>

          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={8} className="empty-posts">
                  No posts found.
                </td>
              </tr>
            ) : (
              posts.map((post) => {
                const PlatformIcon =
                  platformIcons[post.platform] || Share2;

                return (
                  <tr key={post.id}>
                    <td>
                      <div className="post-caption">
                        {post.caption}
                      </div>
                    </td>

                    <td>
                      <div className="post-platform">
                        <span
                          className="post-platform-icon"
                          style={{
                            backgroundColor:
                              platformColors[post.platform]
                                ? `${platformColors[post.platform]}18`
                                : "#F0EDF7",
                            color:
                              platformColors[post.platform] ||
                              "#805AD5",
                          }}
                        >
                          <PlatformIcon size={17} />
                        </span>

                        {post.platform}
                      </div>
                    </td>

                    <td className="post-date">
                      {post.date}
                    </td>

                    <td>
                      <span
                        className={`post-status status-${post.status.toLowerCase()}`}
                      >
                        {post.status}
                      </span>
                    </td>

                    <td>{formatNumber(post.likes)}</td>
                    <td>{formatNumber(post.comments)}</td>
                    <td>{formatNumber(post.shares)}</td>
                    <td>{formatNumber(post.reach)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PostsTable;