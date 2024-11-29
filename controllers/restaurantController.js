const Restaurant = require("../models/Restaurant");

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new restaurant (Only by admin)
exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res
      .status(201)
      .json({ message: "Restaurant created successfully", restaurant });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a restaurant (Only by admin)
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    Object.assign(restaurant, req.body);

    await restaurant.save();
    res
      .status(200)
      .json({ message: "Restaurant updated successfully", restaurant });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a restaurant (Only by admin)
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    await restaurant.deleteOne();
    res.status(204).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
