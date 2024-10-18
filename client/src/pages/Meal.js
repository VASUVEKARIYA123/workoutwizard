import React from 'react';
import Header from "../components/Header";
const mealPlans = [
    {
      id: 1,
      name: "Weight Loss Plan",
      calories: 1500,
      protein: "100g",
      carbs: "150g",
      fats: "50g",
      description: "A balanced plan with moderate carbs and protein to help you lose weight.",
      recipe: [
        "1 cup oatmeal with almond milk",
        "Grilled chicken with steamed vegetables",
        "Mixed green salad with olive oil dressing",
        "Greek yogurt with berries",
      ],
    },
    {
      id: 2,
      name: "Muscle Gain Plan",
      calories: 2500,
      protein: "180g",
      carbs: "200g",
      fats: "80g",
      description: "High in protein to support muscle growth and recovery.",
      recipe: [
        "4 egg whites with whole grain toast",
        "Chicken breast with brown rice and broccoli",
        "Protein smoothie with banana and peanut butter",
        "Salmon with sweet potatoes and asparagus",
      ],
    },
    {
      id: 3,
      name: "Maintenance Plan",
      calories: 2000,
      protein: "130g",
      carbs: "180g",
      fats: "70g",
      description: "A balanced plan to maintain your current weight and stay healthy.",
      recipe: [
        "Avocado toast with poached eggs",
        "Turkey wrap with whole wheat tortilla",
        "Quinoa bowl with black beans and veggies",
        "Stir-fried tofu with mixed greens",
      ],
    },
    {
      id: 4,
      name: "Vegan Plan",
      calories: 1800,
      protein: "90g",
      carbs: "250g",
      fats: "50g",
      description: "A plant-based plan rich in nutrients and flavors.",
      recipe: [
        "Chickpea salad with cucumber and tomatoes",
        "Lentil soup with spinach and carrots",
        "Quinoa stir-fry with mixed vegetables",
        "Fruit smoothie with almond milk and spinach",
      ],
    },
    {
      id: 5,
      name: "Keto Plan",
      calories: 2000,
      protein: "150g",
      carbs: "30g",
      fats: "150g",
      description: "A low-carb, high-fat plan to help you enter ketosis.",
      recipe: [
        "Scrambled eggs with spinach and cheese",
        "Zucchini noodles with pesto and grilled chicken",
        "Cauliflower rice with shrimp and avocado",
        "Keto-friendly cheesecake with almond crust",
      ],
    },
    {
      id: 6,
      name: "Paleo Plan",
      calories: 2200,
      protein: "160g",
      carbs: "100g",
      fats: "80g",
      description: "A plan based on whole foods similar to what our ancestors ate.",
      recipe: [
        "Bacon and eggs with sautéed kale",
        "Grilled steak with sweet potato fries",
        "Mixed berry salad with walnuts",
        "Coconut milk chia pudding with berries",
      ],
    },
    {
      id: 7,
      name: "Mediterranean Plan",
      calories: 1900,
      protein: "120g",
      carbs: "160g",
      fats: "70g",
      description: "A heart-healthy plan rich in fruits, vegetables, and healthy fats.",
      recipe: [
        "Hummus with carrot and cucumber sticks",
        "Grilled salmon with quinoa and spinach salad",
        "Pasta with cherry tomatoes and basil",
        "Greek yogurt with honey and nuts",
      ],
    },
    {
      id: 8,
      name: "Post-Workout Recovery Plan",
      calories: 2200,
      protein: "180g",
      carbs: "200g",
      fats: "70g",
      description: "A plan designed to help recover and refuel after intense workouts.",
      recipe: [
        "Protein shake with banana and oats",
        "Turkey and cheese sandwich on whole grain bread",
        "Stir-fried chicken with brown rice and mixed vegetables",
        "Cottage cheese with pineapple",
      ],
    },
  ];
  

const MealPlansPage = () => {
  return (
    <div>
        <Header />
        <div className="exercise d-flex flex-column align-items-center">
            
            <h2 className='title'>Meal Plans</h2>
            
        
            <div style={styles.container}>
            
            {/* <h2 style={styles.heading}>Meal Plans</h2> */}
            <div style={styles.mealPlansContainer}>
                {mealPlans.map((plan) => (
                <div key={plan.id} style={styles.card}>
                    <h3 style={styles.planName}>{plan.name}</h3>
                    <p style={styles.planDetail}><strong>Calories:</strong> {plan.calories}</p>
                    <p style={styles.planDetail}><strong>Protein:</strong> {plan.protein}</p>
                    <p style={styles.planDetail}><strong>Carbs:</strong> {plan.carbs}</p>
                    <p style={styles.planDetail}><strong>Fats:</strong> {plan.fats}</p>
                    <p style={styles.description}>{plan.description}</p>
                    <div style={styles.recipeContainer}>
                    <h4 style={styles.recipeTitle}>Recipe:</h4>
                    <ul style={styles.recipeList}>
                        {plan.recipe.map((item, index) => (
                        <li key={index} style={styles.recipeItem}>{item}</li>
                        ))}
                    </ul>
                    </div>
                    <button style={styles.button}>View Details</button>
                </div>
                ))}
            </div>
            </div>
        </div>
    </div>
  );
};

const styles = {
  container: {
    // padding: '20px',
    backgroundColor: '#f4f4f4',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  mealPlansContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '300px',
    textAlign: 'center',
  },
  planName: {
    color: '#007BFF',
    marginBottom: '10px',
  },
  planDetail: {
    margin: '5px 0',
    color: '#555',
  },
  description: {
    margin: '10px 0',
    color: '#666',
  },
  recipeContainer: {
    marginTop: '15px',
    textAlign: 'left',
  },
  recipeTitle: {
    color: '#007BFF',
    marginBottom: '5px',
  },
  recipeList: {
    paddingLeft: '20px',
  },
  recipeItem: {
    marginBottom: '5px',
    color: '#555',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default MealPlansPage;
