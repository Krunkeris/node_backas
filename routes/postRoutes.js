const express = require("express");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/postControllers");
const {
  authenticateUserRole,
  authenticateJwt,
} = require("../middleware/protectedRoutes.middleware");

const router = express.Router();

//get all posts
router.get("/", authenticateJwt, getAllPosts);

// Get post by id
router.get("/:id", authenticateJwt, authenticateUserRole("user"), getPostById);

// Create a post
router.post("/", authenticateJwt, authenticateUserRole("user"), createPost);

// Update a post
router.put("/:id", authenticateJwt, updatePost);

router.put(
  "/:id/like",
  authenticateJwt,
  authenticateUserRole("user"),
  likePost
);

// Delete a post
router.delete(
  "/:id",
  authenticateJwt,
  authenticateUserRole("user"),
  deletePost
);

module.exports = router;
