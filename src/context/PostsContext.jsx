import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { postsData } from "../data/postsData";

const PostsContext = createContext(null);

const STORAGE_KEY = "socialpulse-posts";

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(() => {
    try {
      const savedPosts = localStorage.getItem(STORAGE_KEY);

      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts);

        if (Array.isArray(parsedPosts)) {
          return parsedPosts;
        }
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    }

    return postsData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(posts)
      );
    } catch (error) {
      console.error("Error saving posts:", error);
    }
  }, [posts]);

  const addPost = (newPost) => {
    setPosts((previousPosts) => [
      newPost,
      ...previousPosts,
    ]);
  };

  const deletePost = (postId) => {
    setPosts((previousPosts) =>
      previousPosts.filter((post) => post.id !== postId)
    );
  };

  const updatePost = (postId, updatedDetails) => {
    setPosts((previousPosts) =>
      previousPosts.map((post) =>
        post.id === postId
          ? { ...post, ...updatedDetails }
          : post
      )
    );
  };

  const totalPosts = posts.length;

  const publishedPosts = posts.filter(
    (post) => post.status === "Published"
  );

  const scheduledPosts = posts.filter(
    (post) => post.status === "Scheduled"
  );

  const draftPosts = posts.filter(
    (post) => post.status === "Draft"
  );

  const totalLikes = posts.reduce(
    (total, post) => total + post.likes,
    0
  );

  const totalComments = posts.reduce(
    (total, post) => total + post.comments,
    0
  );

  const totalShares = posts.reduce(
    (total, post) => total + post.shares,
    0
  );

  const totalReach = posts.reduce(
    (total, post) => total + post.reach,
    0
  );

  const totalEngagement =
    totalLikes + totalComments + totalShares;

  const value = {
    posts,
    addPost,
    deletePost,
    updatePost,

    totalPosts,
    publishedPosts,
    scheduledPosts,
    draftPosts,

    totalLikes,
    totalComments,
    totalShares,
    totalReach,
    totalEngagement,
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error(
      "usePosts must be used inside PostsProvider"
    );
  }

  return context;
}