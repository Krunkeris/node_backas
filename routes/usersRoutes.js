const express = require("express");

const {
  getAllUsers,
  blockOrUnblockUser,
} = require("../controllers/usersController");

const {
  authenticateJwt,
  authenticateUserRole,
} = require("../middleware/protectedRoutes.middleware");

const router = express.Router();

//get all users
router.get("/", authenticateJwt, authenticateUserRole("admin"), getAllUsers);

//block user
router.post(
  "/:id",
  authenticateJwt,
  authenticateUserRole("admin"),
  blockOrUnblockUser
);

module.exports = router;
