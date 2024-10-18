import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Auth from "../utils/auth";
import { createWorkoutplan } from '../utils/API';
import Header from "./Header";
import workoutIcon from "../assets/images/resistance-w.png";
import "./workoutplan.css"; // Make sure to create and import a CSS file for custom styling

export default function AddWorkout() {
    const [workoutForm, setWorkoutForm] = useState({
        name: "",
        exercises: [{
            name: "",
            sets: "",
            reps: "",
            weight: "",
            duration: ""
        }]
    });
    const [message, setMessage] = useState("");
    const loggedIn = Auth.loggedIn();
    const location = useLocation();

    // Extract the workout name from query parameters and pre-fill the form
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const name = queryParams.get('name');
        if (name) {
            setWorkoutForm((prevForm) => ({
                ...prevForm,
                name: decodeURIComponent(name)
            }));
        }
    }, [location]);

    const handleExerciseChange = (event, index) => {
        const { name, value } = event.target;
        const updatedExercises = [...workoutForm.exercises];
        updatedExercises[index][name] = value;
        setWorkoutForm({ ...workoutForm, exercises: updatedExercises });
    };

    const handleWorkoutChange = (event) => {
        const { name, value } = event.target;
        setWorkoutForm({ ...workoutForm, [name]: value });
    };

    const addExercise = () => {
        setWorkoutForm((prevForm) => ({
            ...prevForm,
            exercises: [...prevForm.exercises, {
                name: "",
                sets: "",
                reps: "",
                weight: "",
                duration: ""
            }]
        }));
    };

    const validateForm = (form) => {
        return form.name && form.exercises.every(exercise => exercise.name && exercise.sets && exercise.reps && exercise.weight && exercise.duration);
    };

    const handleWorkoutSubmit = async (event) => {
        event.preventDefault();

        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        const userId = Auth.getUserId();

        if (validateForm(workoutForm)) {
            try {
                workoutForm.userId = userId;

                const response = await createWorkoutplan(workoutForm, token);

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                setMessage("Workout successfully created!");
                setTimeout(() => {
                    setMessage("");
                }, 3000);

            } catch (err) {
                console.error(err);
            }
        }

        setWorkoutForm({
            name: "",
            exercises: [{
                name: "",
                sets: "",
                reps: "",
                weight: "",
                duration: ""
            }]
        });
    };

    if (!loggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className='workout'>
            <Header />
            <div className="workout-container">
                <h2 className='title text-center'>Add Workout</h2>
                <form className='workout-form' onSubmit={handleWorkoutSubmit}>
                    <div className='form-group'>
                        <img alt="workout" src={workoutIcon} className="exercise-form-icon" />
                    </div>
                    <div className='form-group'>
                        <label>Workout Name:</label>
                        <input
                            type="text"
                            name="name"
                            className="form-input"
                            placeholder="Full Body Workout"
                            value={workoutForm.name}
                            onChange={handleWorkoutChange}
                        />
                    </div>
                    {workoutForm.exercises.map((exercise, index) => (
                        <div key={index} className='exercise-inputs'>
                            <div className='form-group'>
                                <label>Exercise Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    placeholder="Bench Press"
                                    value={exercise.name}
                                    onChange={(e) => handleExerciseChange(e, index)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Sets:</label>
                                <input
                                    type="number"
                                    name="sets"
                                    className="form-input"
                                    placeholder="0"
                                    value={exercise.sets}
                                    onChange={(e) => handleExerciseChange(e, index)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Reps:</label>
                                <input
                                    type="number"
                                    name="reps"
                                    className="form-input"
                                    placeholder="0"
                                    value={exercise.reps}
                                    onChange={(e) => handleExerciseChange(e, index)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Weight (lbs):</label>
                                <input
                                    type="number"
                                    name="weight"
                                    className="form-input"
                                    placeholder="0"
                                    value={exercise.weight}
                                    onChange={(e) => handleExerciseChange(e, index)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Duration (mins):</label>
                                <input
                                    type="number"
                                    name="duration"
                                    className="form-input"
                                    placeholder="0"
                                    value={exercise.duration}
                                    onChange={(e) => handleExerciseChange(e, index)}
                                />
                            </div>
                        </div>
                    ))}
                    <button type="button" className='add-exercise-btn' onClick={addExercise}>
                        Add Another Exercise
                    </button>
                    <button className='submit-btn' type="submit" disabled={!validateForm(workoutForm)}>
                        Add Workout
                    </button>
                </form>
                <p className='mes'>{message}</p>
            </div>
        </div>
    );
}
