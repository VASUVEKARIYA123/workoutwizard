const { Workout, User } = require("../models");

module.exports = {
  // Create a workout
  createWorkout({ body }, res) {
    Workout.create(body)
      .then((dbWorkoutData) => {
        // Associate the created workout with a user
        console.log("hello");
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { workout: dbWorkoutData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Workout created, but no user found with this ID!" });
        }
        res.json({ message: "Workout successfully created!" });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Get a workout by ID
  getWorkoutById({ params }, res) {
    Workout.findOne({ _id: params.id })
      .then((dbWorkoutData) => {
        if (!dbWorkoutData) {
          return res.status(404).json({ message: "No workout found with this ID!" });
        }
        res.json(dbWorkoutData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a workout by ID
  deleteWorkout({ params }, res) {
    Workout.findOneAndDelete({ _id: params.id })
      .then((dbWorkoutData) => {
        if (!dbWorkoutData) {
          return res.status(404).json({ message: "No workout found with this ID!" });
        }
        // Remove the workout reference from the user's document
        return User.findOneAndUpdate(
          { workout: params.id },
          { $pull: { workout: params.id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Workout deleted, but no user found with this ID!" });
        }
        res.json({ message: "Workout successfully deleted!" });
      })
      .catch((err) => res.status(500).json(err));
  },
};
