const getRandomRecipe = async (req, res) => {
  try {
    try {
      const API = "https://api.spoonacular.com/recipes/complexSearch";
    } catch (error) {
      console.log(error);
    }

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
