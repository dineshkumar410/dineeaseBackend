const Restaurant = require("../models/Restaurant");

// Search for restaurants with filters
exports.searchRestaurants = async (req, res) => {
  try {
    const {
      cuisine,
      priceRange,
      location,
      dietaryRestrictions,
      ambiance,
      specialFeatures,
    } = req.query;

    const query = {};

    // Filtering logic
    if (cuisine) query.cuisine = { $regex: cuisine, $options: "i" };
    if (priceRange) query.priceRange = priceRange;
    if (location) query.location = { $regex: location, $options: "i" };
    if (dietaryRestrictions)
      query.dietaryRestrictions = { $in: dietaryRestrictions.split(",") };
    if (ambiance) query.ambiance = { $regex: ambiance, $options: "i" };
    if (specialFeatures)
      query.specialFeatures = { $in: specialFeatures.split(",") };

    const restaurants = await Restaurant.find(query);

    res.status(200).json({ results: restaurants.length, restaurants });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
