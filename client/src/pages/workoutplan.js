import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { getMe, createResistance, deleteWorkout } from '../utils/API'; // Ensure deleteWorkout is imported
import Auth from "../utils/auth";
import Header from "../components/Header";
import "./workoutplan.css";

export default function WorkoutPage() {
  const [userData, setUserData] = useState({});
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [timers, setTimers] = useState({});
  const [addedExercises, setAddedExercises] = useState(new Set()); // Track added exercises
  const [exerciseToAdd, setExerciseToAdd] = useState(null); // Track exercise to be added
  const loggedIn = Auth.loggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const user = await response.json();
        
        // Set user data and extract workout plans if they exist
        setUserData(user);
        if (user.workout) {
          setWorkoutPlans(user.workout);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [loggedIn]);

  // If the user is not logged in, redirect to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  // Open modal with workout plan details
  const openModal = (plan) => {
    setSelectedPlan(plan);
    setAddedExercises(new Set()); // Reset added exercises when modal opens
  };

  // Close the modal
  const closeModal = () => {
    setSelectedPlan(null);
    setTimers({}); // Reset timers when modal is closed
    setExerciseToAdd(null); // Reset exercise to add when modal is closed
  };

  // Start the timer for a specific exercise
  const startTimer = (exerciseId, duration, exerciseDetails) => {
    // If a timer is already running for this exercise, don't start a new one
    if (timers[exerciseId] !== undefined) return;

    // Initialize timer state for this exercise
    setTimers((prevTimers) => ({
      ...prevTimers,
      [exerciseId]: duration * 60, // Convert minutes to seconds
    }));

    const countdown = setInterval(() => {
      setTimers((prevTimers) => {
        const currentTime = prevTimers[exerciseId] - 1;

        if (currentTime <= 0) {
          clearInterval(countdown);
          // Check if this exercise has already been added
          if (!addedExercises.has(exerciseId)) {
            alert(`Time is up for exercise: ${exerciseDetails.name}`);
            setExerciseToAdd(exerciseDetails); // Set the exercise to add
          }
          return { ...prevTimers, [exerciseId]: 0 }; // Set timer to 0 when done
        }

        return { ...prevTimers, [exerciseId]: currentTime }; // Update timer
      });
    }, 1000);
  };

  // Function to handle creating resistance exercise
  const handleCreateResistance = async () => {
    if (!exerciseToAdd) return; // Ensure there is an exercise to add

    const token = Auth.getToken();
    const resistanceData = {
      type: "resistance",
      name: exerciseToAdd.name,
      weight: exerciseToAdd.weight,
      sets: exerciseToAdd.sets,
      reps: exerciseToAdd.reps,
      date: new Date(), // Current date
      userId: userData._id, // User ID from user data
    };

    try {
      const response = await createResistance(resistanceData, token);
      if (!response.ok) {
        throw new Error("Failed to create resistance exercise.");
      }
      console.log("Resistance exercise created successfully!"); // Changed alert to console log
      setAddedExercises((prev) => new Set(prev).add(exerciseToAdd._id)); // Add to added exercises
      setExerciseToAdd(null); // Reset exercise to add
    } catch (err) {
      console.error(err);
    }
  };

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Function to delete a workout plan
  const handleDeleteWorkout = async (workoutId) => {
    const token = Auth.getToken();
    try {
      const response = await deleteWorkout(workoutId, token);
      if (!response.ok) {
        throw new Error("Failed to delete workout plan.");
      }
      // Remove deleted workout plan from state
      setWorkoutPlans(workoutPlans.filter(plan => plan._id !== workoutId));
      console.log("Workout plan deleted successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='workout-page'>
      <Header />
      <div className="exercise d-flex flex-column align-items-center">
        <h2 className='title'>Add Workout Plans</h2>
        <div>
          <button className='cardio-btn d-flex flex-column align-items-center justify-content-center' onClick={() => navigate("/AddWorkoutplan")}>
            Add Workout Plan
          </button>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        <h2 className='title text-center'>Your Workout Plans</h2>
        <div className='workout-list'>
          {workoutPlans.length ? (
            workoutPlans.map((plan) => (
              <div key={plan._id} className='workout-card'>
                <h3>{plan.name}</h3>
                <p>Exercises: {plan.exercises.length}</p>
                <button 
                  className='view-details-btn' 
                  onClick={() => openModal(plan)}
                >
                  View Details
                </button>
                <button 
                  className='delbut'
                  onClick={() => handleDeleteWorkout(plan._id)}
                >
                  Delete plan
                </button>
              </div>
            ))
          ) : (
            <p>No workout plans found. Please add a workout!</p>
          )}
        </div>
      </div>

      {/* Modal for displaying workout plan details */}
      {selectedPlan && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h3>{selectedPlan.name}</h3>
            <button className='close-btn' onClick={closeModal}>Close</button>
            <div className='exercise-list'>
              {selectedPlan.exercises.length ? (
                selectedPlan.exercises.map((exercise) => (
                  <div key={exercise._id} className='exercise-row'>
                    <p className='exercise-name'>{exercise.name}</p>
                    <p className='exercise-type'>{exercise.type}</p>
                    {exercise.type === 'cardio' ? (
                      <p className='exercise-detail'>Distance: {exercise.distance} miles</p>
                    ) : (
                      <>
                        <p className='exercise-detail'>Weight: {exercise.weight} pounds</p>
                        <p className='exercise-detail'>Reps: {exercise.reps}</p>
                        <p className='exercise-detail'>Sets: {exercise.sets}</p>
                      </>
                    )}
                    <div className='timer'>
                      <p>Timer: {timers[exercise._id] !== undefined ? formatTime(timers[exercise._id]) : formatTime(exercise.duration * 60)}</p>
                      <button 
                        onClick={() => startTimer(exercise._id, exercise.duration, exercise)} 
                        disabled={timers[exercise._id] !== undefined && timers[exercise._id] > 0}
                      >
                        Start Timer
                      </button>
                      {timers[exercise._id] === 0 && exerciseToAdd && exerciseToAdd._id === exercise._id && (
                        <button 
                          onClick={handleCreateResistance} 
                          className="add-exercise-btn"
                        >
                          Add Exercise
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No exercises found in this plan.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
