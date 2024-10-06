const express = require("express");
const { authenticateJwt } = require("../middleware/protectedRoutes.middleware");
const {
  getAllComments,
  getCommentByPostsId,
  createComment,
  deleteComment,
  updateComment,
} = require("../controllers/commentsControllers");

const router = express.Router();

//get all comments
router.get("/", authenticateJwt, getAllComments);

//get comment by posts id
router.get("/:postsId", authenticateJwt, getCommentByPostsId);

//create a comment
router.post("/", authenticateJwt, createComment);

//delete a comment
router.delete("/:id", authenticateJwt, deleteComment);

//update a comment
router.put("/:id", authenticateJwt, updateComment);

module.exports = router;
