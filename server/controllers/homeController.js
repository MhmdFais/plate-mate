const getRandomRecipe = async (req, res) => {
  try {
    const API_KEY = process.env.API_KEY;
    const API = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`;

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
