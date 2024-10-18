const { Meal, User } = require("../models");

module.exports = {
  // create a meal
  createMeal({ body }, res) {
    Meal.create(body)
      .then((dbMealData) => {
        return User.findOneAndUpdate(
          { _id: body.author },
          { $push: { meals: dbMealData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Meal created but no user with this id!" });
        }
        res.json({ message: "Meal successfully created!" });
      })
      .catch((err) => res.status(500).json(err));
  },

  // get one meal by id
  getMealById({ params }, res) {
    Meal.findOne({ _id: params.id })
      .then((dbMealData) => {
        if (!dbMealData) {
          return res.status(404).json({ message: "No meal data found with this id!" });
        }
        res.json(dbMealData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // delete meal data
  deleteMeal({ params }, res) {
    Meal.findOneAndDelete({ _id: params.id })
      .then((dbMealData) => {
        if (!dbMealData) {
          return res.status(404).json({ message: "No meal data found with this id!" });
        }
        // remove meal reference from user's data
        return User.findOneAndUpdate(
          { meals: params.id },
          { $pull: { meals: params.id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Meal deleted but no user with this id!" });
        }
        res.json({ message: "Meal successfully deleted!" });
      })
      .catch((err) => res.status(500).json(err));
  },
};
