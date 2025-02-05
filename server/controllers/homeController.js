const getRandomRecipe = async (req, res) => {
  try {
    const API = "https://api.spoonacular.com/recipes/complexSearch";

    const response = await fetch(API);

    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getRandomRecipe,
};
