import { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const [recipe, setRecipe] = useState([]);

  const API_URL = "http://localhost:3000";

  const getRandomRecipe = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);

      const data = response.data;

      setRecipe(data.results || []);

      console.log(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRandomRecipe();
  }, []);

  return (
    <div className="mainContainer">
      <div className="headingContainer">
        <h1>Today Picks</h1>
      </div>
      <div className="recipiesContainer">
        <div className="recipeCard" key={recipe.id}>
          {recipe.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
