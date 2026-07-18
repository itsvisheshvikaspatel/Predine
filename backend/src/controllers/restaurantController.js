const restaurants = require("../data/restaurants");

function getAllRestaurants(req, res) {
  res.json(restaurants);
}

module.exports = {
  getAllRestaurants,
};