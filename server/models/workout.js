const { Schema, model } = require("mongoose");

const WorkoutSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: "Workout name is required",
    trim: true
  },
  exercises: [{
    name: {
      type: String,
      required: "Exercise name is required",
      trim: true
    },
    sets: {
      type: Number,
      required: true
    },
    reps: {
      type: Number,
      required: true
    },
    duration: Number, // For cardio exercises (optional)
    weight: Number // For resistance exercises (optional)
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Workout = model("Workout", WorkoutSchema);

module.exports = Workout;
