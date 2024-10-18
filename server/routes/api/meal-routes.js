const router = require("express").Router();
const {
  createMeal,
  getMealById,
  deleteMeal,
} = require("../../controllers/meal-controller");

// Import middleware
const { authMiddleware } = require('../../utils/auth');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// /api/meals
router.route("/meals").post(createMeal);

// /api/meals/:id
router.route("/meals/:id").get(getMealById).delete(deleteMeal);

module.exports = router;
