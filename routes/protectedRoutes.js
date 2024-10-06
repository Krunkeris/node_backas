const express = require("express");
const { authenticateJwt } = require("../middleware/protectedRoutes.middleware");

const {
  protectedRouteToHome,
} = require("../controllers/protectedRouteController");

const router = express.Router();

router.get("/home", authenticateJwt, protectedRouteToHome);

module.exports = router;
