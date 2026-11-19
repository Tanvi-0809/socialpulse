import { useEffect, useState } from "react";
import { RefreshCw, Wifi, AlertCircle } from "lucide-react";

import { fetchPosts } from "../../services/api";

// English demo content for the API posts
const englishPosts = [
  {
    title: "Our New Campaign Is Live!",
    body: "We're excited to launch our latest social media campaign. Stay tuned for creative updates, exciting announcements, and behind-the-scenes content.",
  },
  {
    title: "Thank You for 10K Followers!",
    body: "We've reached an amazing milestone! Thank you to everyone who supports our journey. More exciting content is coming soon.",
  },
  {
    title: "Behind the Scenes",
    body: "Take a look at how our team creates engaging content, from brainstorming ideas to designing and publishing our posts.",
  },
  {
    title: "Weekend Engagement Challenge",
    body: "Join our weekend challenge! Share your favorite creative moment and tag us for a chance to be featured on our page.",
  },
  {
    title: "New Product Announcement",
    body: "Something exciting is coming! Our team has been working on a new product designed to make your everyday experience even better.",
  },
  {
    title: "Community Spotlight",
    body: "Today we're celebrating our incredible community. Your feedback, creativity, and support inspire us every day.",
  },
  {
    title: "Social Media Growth Tips",
    body: "Consistency, creativity, and audience engagement are essential for building a strong social media presence.",
  },
  {
    title: "Meet Our Creative Team",
    body: "Get to know the people behind our content! Our team brings together creativity, technology, and fresh ideas.",
  },
  {
    title: "Upcoming Live Session",
    body: "We're hosting an interactive live session this weekend. Join us for discussions, questions, and exciting updates.",
  },
  {
    title: "Monthly Performance Highlights",
    body: "This month we've seen impressive growth in engagement, reach, and audience interactions. Thank you for being part of our journey!",
  },
  {
    title: "Exciting Collaboration Announcement",
    body: "We're partnering with talented creators to bring fresh ideas and engaging experiences to our community.",
  },
  {
    title: "What's Coming Next?",
    body: "We're planning new campaigns, interactive events, and creative content. Follow along to stay updated!",
  },
];

// Fetch and display different API posts on every refresh
function LiveFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    let active = true;

    const loadPosts = async () => {
      setLoading(true);
      setError("");

      try {
        // Actual Axios API request through our service
        const data = await fetchPosts();

        if (!active) return;

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No posts returned");
        }

        // Select a different batch of six posts
        const batchCount = Math.ceil(data.length / 6);
        const batchIndex = refreshCount % batchCount;
        const startIndex = batchIndex * 6;

        const selectedPosts = data.slice(
          startIndex,
          startIndex + 6
        );

        // Replace placeholder text with clearly labeled demo content
        const formattedPosts = selectedPosts.map((post) => {
          const content =
            englishPosts[(post.id - 1) % englishPosts.length];

          return {
            ...post,
            title: content.title,
            body: content.body,
          };
        });

        setPosts(formattedPosts);
      } catch (err) {
        if (active) {
          setError("Unable to load posts. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      active = false;
    };
  }, [refreshCount]);

  const handleRefresh = () => {
    setRefreshCount((count) => count + 1);
  };

  return (
    <div className="chart-card">
      {/* HEADER */}

      <div className="chart-header">
        <div>
          <h3>Live API Feed</h3>
          <p>API-fetched records with English demo content</p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 14px",
            border: "1px solid #E8E3F1",
            borderRadius: "10px",
            background: "#FFFFFF",
            color: "#805AD5",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          <RefreshCw size={16} />
          Refresh Feed
        </button>
      </div>

      {/* LOADING STATE */}

      {loading && (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#805AD5",
          }}
        >
          <RefreshCw
            size={26}
            style={{ marginBottom: "10px" }}
          />

          <p>Loading posts from API...</p>
        </div>
      )}

      {/* ERROR STATE */}

      {!loading && error && (
        <div
          style={{
            padding: "35px",
            textAlign: "center",
            color: "#E05272",
          }}
        >
          <AlertCircle size={25} />
          <p>{error}</p>
        </div>
      )}

      {/* SUCCESS STATE */}

      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                background: "#FAF8FF",
                border: "1px solid #EEE9F7",
                borderRadius: "14px",
                padding: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  color: "#805AD5",
                }}
              >
                <Wifi size={16} />

                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  API POST #{post.id}
                </span>
              </div>

              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  marginBottom: "10px",
                  textTransform: "capitalize",
                }}
              >
                {post.title}
              </h4>

              <p
                style={{
                  fontSize: "13px",
                  lineHeight: "1.6",
                  color: "#777184",
                }}
              >
                {post.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LiveFeed;