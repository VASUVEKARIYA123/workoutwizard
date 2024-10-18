const router = require("express").Router();
const userRoutes = require("./user-routes");
const exerciseRoutes = require("./exercise-routes");
const mealRoutes = require("./meal-routes");
const workoutRoutes = require("./workout-rotutes")

router.use("/user", userRoutes);
router.use("/exercise", exerciseRoutes);
router.use("/meal", mealRoutes);
router.use("/workout", workoutRoutes);

module.exports = router;
