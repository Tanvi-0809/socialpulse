import axios from "axios";

// Base URL for our demonstration API
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Create a reusable Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Fetch sample posts from the API
export const fetchPosts = async () => {
  try {
    const response = await api.get("/posts");

    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);

    throw error;
  }
};

// Fetch a specific post by ID
export const fetchPostById = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);

    throw error;
  }
};

// Fetch comments for a specific post
export const fetchPostComments = async (postId) => {
  try {
    const response = await api.get(
      `/posts/${postId}/comments`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);

    throw error;
  }
};

export default api;