import { useState } from "react";
import { Search, Plus, FileText } from "lucide-react";

import PostsTable from "../components/tables/PostsTable";
import CreatePostModal from "../components/common/CreatePostModal";
import { usePosts } from "../context/PostsContext";

function Posts() {
  // Get shared post data from React Context
  const { posts, addPost } = usePosts();

  // Search and filter states
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All");
  const [status, setStatus] = useState("All");

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Add a new post using shared Context
  const handleCreatePost = (newPost) => {
    addPost(newPost);

    // Reset filters so the new post is visible
    setSearch("");
    setPlatform("All");
    setStatus("All");

    // Close the popup
    setShowCreateModal(false);
  };

  // Filter posts based on search, platform and status
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.caption
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPlatform =
      platform === "All" || post.platform === platform;

    const matchesStatus =
      status === "All" || post.status === status;

    return matchesSearch && matchesPlatform && matchesStatus;
  });

  return (
    <div className="page-content posts-page">
      {/* PAGE HEADING */}

      <div className="posts-page-header">
        <div>
          <p className="eyebrow">CONTENT MANAGEMENT</p>

          <h1>Post Management</h1>

          <p className="subtitle">
            Track and analyze your social media content.
          </p>
        </div>

        <button
          type="button"
          className="create-post-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={18} />
          Create Post
        </button>
      </div>

      {/* POSTS SUMMARY */}

      <div className="posts-summary">
        <FileText size={20} color="#805AD5" />

        <span>
          Showing <strong>{filteredPosts.length}</strong> of{" "}
          <strong>{posts.length}</strong> posts
        </span>
      </div>

      {/* SEARCH AND FILTERS */}

      <div className="posts-filters">
        <div className="posts-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          value={platform}
          onChange={(event) => setPlatform(event.target.value)}
        >
          <option value="All">All Platforms</option>
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Twitter">Twitter</option>
        </select>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Published">Published</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      {/* POSTS TABLE */}

      <PostsTable posts={filteredPosts} />

      {/* CREATE POST POPUP */}

      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreatePost}
        />
      )}
    </div>
  );
}

export default Posts;