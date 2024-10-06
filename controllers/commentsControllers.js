const Comment = require("../models/Comment");
const Post = require("../models/Posts");

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

const getCommentByPostsId = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId).populate("comments");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post.comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching comments for the post", error });
  }
};

const createComment = async (req, res) => {
  const { authorId, text, postsId } = req.body;

  const newComment = new Comment({
    authorId,
    postsId,
    text,
  });

  try {
    const savedComment = await newComment.save();

    await Post.findByIdAndUpdate(postsId, {
      $push: { comments: savedComment._id },
    });

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error });
  }
};

const updateComment = async (req, res) => {
  const commentId = req.params.commentId;
  const { text } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error updating comment", error });
  }
};

const deleteComment = async (req, res) => {
  const commentId = req.params.commentId;

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await Post.updateMany(
      { comments: commentId },
      { $pull: { comments: commentId } }
    );

    res.status(200).json({ message: "Comment deleted successfully" }); // Respond with success message
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

module.exports = {
  getAllComments,
  getCommentByPostsId,
  createComment,
  updateComment,
  deleteComment,
};
