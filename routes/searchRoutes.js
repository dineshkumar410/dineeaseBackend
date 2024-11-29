const express = require("express");
const router = express.Router();
const { searchRestaurants } = require("../controllers/searchController");

// Search for restaurants with filters
router.get("/", searchRestaurants);

module.exports = router;
