const Post = require("../models/Posts");

// Get all posts
const getAllPosts = async (req, res) => {
  console.log("Fetching all posts...");
  try {
    const posts = await Post.find(); // Fetch all posts from the database
    res.status(200).json(posts); // Send the posts as a JSON response
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

// Get post by ID
const getPostById = async (req, res) => {
  console.log(`Fetching post with ID: ${req.params.id}`);
  try {
    const post = await Post.findById(req.params.id); // Fetch post by ID
    if (!post) {
      return res.status(404).json({ message: "Post not found" }); // If no post found, return 404
    }
    res.status(200).json(post); // Send the post as a JSON response
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.message });
  }
};

// Create a new post
const createPost = async (req, res) => {
  console.log("Creating a new post...");
  try {
    const { userId, name, category, description, price, imgHttps } = req.body; // Destructure request body
    const newPost = new Post({
      userId,
      name,
      category,
      description,
      price,
      imgHttps,
      authorId: req.user.id, // Assuming you want to associate the post with the user
    });

    await newPost.save(); // Save the new post to the database
    res.status(201).json(newPost); // Send the created post as a JSON response
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

// Update an existing post
const updatePost = async (req, res) => {
  console.log(`Updating post with ID: ${req.params.id}`);
  try {
    // Include the 'status' field in the destructuring
    const { name, category, description, price, imgHttps, status } = req.body;

    // Update the post, including the 'status' field
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { name, category, description, price, imgHttps, status }, // Add 'status' here
      { new: true } // Return the updated post
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  console.log(`Deleting post with ID: ${req.params.id}`);
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id); // Delete post by ID
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" }); // If no post found, return 404
    }
    res.status(200).json({ message: "Post deleted" }); // Send success message
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id; // Assuming user ID comes from the authenticated request

    console.log("postid", postId);
    console.log("userId", userId);

    // Find the post by ID
    const post = await Post.findById(postId);
    console.log("Post found:", post);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    const userIndex = post.likes.indexOf(userId);

    if (userIndex !== -1) {
      // If user already liked the post, remove their ID (unlike)
      post.likes.splice(userIndex, 1);
      await post.save();
      return res.status(200).json({ message: "Post unliked", post });
    }

    // If user has not liked the post, add their ID (like)
    post.likes.push(userId);

    // Save the updated post
    await post.save();

    res.status(200).json({ message: "Post liked", post });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error liking/unliking post", error: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
