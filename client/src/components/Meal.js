import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Auth from "../utils/auth";
import { createMeal } from '../utils/API';
import Header from "./Header";
import mealIcon from "../assets/images/meal.jpg";

export default function MealForm() {
    const [mealForm, setMealForm] = useState({
        name: "",
        recipe: "",
        date: "",
        description: "",
        category: ""
    });
    const [startDate, setStartDate] = useState(new Date());
    const [message, setMessage] = useState("");
    const loggedIn = Auth.loggedIn();

    const handleMealChange = (event) => {
        const { name, value } = event.target;
        setMealForm({ ...mealForm, [name]: value });
    };

    const handleDateChange = (date) => {
        setStartDate(date);
        handleMealChange({
            target: { name: "date", value: date }
        });
    };

    const validateForm = (form) => {
        return form.name && form.date && form.category;
    };

    const handleMealSubmit = async (event) => {
        event.preventDefault();

        // Get token
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        // Get user id 
        const userId = Auth.getUserId();

        // Meal submission
        if (validateForm(mealForm)) {
            try {
                mealForm.userId = userId;

                const response = await createMeal(mealForm, token);

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }

                setMessage("Meal successfully added!");
                setTimeout(() => {
                    setMessage("");
                }, 3000);
            } catch (err) {
                console.error(err);
            }
        }

        // Clear form input
        setMealForm({
            name: "",
            recipe: "",
            date: "",
            description: "",
            category: ""
        });
    };

    if (!loggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className='meal'>
            <Header />
            <div className="d-flex flex-column align-items-center">
                <h2 className='title text-center'>Add Meal</h2>
                <form className='meal-form d-flex flex-column' onSubmit={handleMealSubmit}>
                    <div className='d-flex justify-content-center'>
                        <img alt="meal" src={mealIcon} className="meal-form-icon" />
                    </div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Meal Name"
                        value={mealForm.name} 
                        onChange={handleMealChange} 
                    />
                    <label>Recipe:</label>
                    <textarea 
                        name="recipe" 
                        id="recipe" 
                        placeholder="Enter recipe details"
                        value={mealForm.recipe} 
                        onChange={handleMealChange} 
                    />
                    <label>Date:</label>
                    <DatePicker 
                        selected={startDate} 
                        value={mealForm.date} 
                        onChange={handleDateChange} 
                        placeholderText="mm/dd/yyyy" 
                    />
                    <label>Description:</label>
                    <textarea 
                        name="description" 
                        id="description" 
                        placeholder="Short description"
                        value={mealForm.description} 
                        onChange={handleMealChange} 
                    />
                    <label>Category:</label>
                    <input 
                        type="text" 
                        name="category" 
                        id="category" 
                        placeholder="e.g., Breakfast, Lunch"
                        value={mealForm.category} 
                        onChange={handleMealChange} 
                    />
                    <button 
                        className='submit-btn meal-submit-btn' 
                        type="submit" 
                        disabled={!validateForm(mealForm)} 
                    >
                        Add
                    </button>
                </form>
                <p className='message'>{message}</p>
            </div>
        </div>
    );
}
