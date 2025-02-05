import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <div className="recipeCard" key={recipe.id}>
      <div className="headingContainer">
        <h2>{recipe.title}</h2>
      </div>
      <div className="cardContentContainer">
        <img src={recipe.image} alt={recipe.title} />
        <p>{recipe.description}</p>
      </div>
      <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>
    </div>
  );
}

export default RecipeCard;

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
};
