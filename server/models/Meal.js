//models/Meal.js
const { Schema, model } = require("mongoose");

const MealSchema = new Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User', 
            required: true
        },
        recipe: { 
            type: String, 
            default: "" 
        },
        date: { 
            type: Number, 
            required: true 
        },
        description: { 
            type: String 
        },
        category: { 
            type: String, 
            required: true 
        }
    }
)

const Meal = model("Meal",MealSchema)

module.exports = Meal;
