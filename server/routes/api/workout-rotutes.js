const express = require('express');
const router = express.Router();
const workoutController = require('../../controllers/workout-controller');

const { authMiddleware } = require("../../utils/auth");
router.use(authMiddleware);
// Route to create a new workout
router.post('/', workoutController.createWorkout);

// Route to get a workout by ID
router.get('/:id', workoutController.getWorkoutById);

// Route to delete a workout by ID
router.delete('/:id', workoutController.deleteWorkout);

module.exports = router;
