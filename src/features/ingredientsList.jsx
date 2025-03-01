import PropTypes from "prop-types";

function IngredientsList({ ingredientsList }) {
  return (
    <div className="ingredients-List">
      <h1>Ingredients on hand:</h1>
      <ul>
        {ingredientsList.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}
IngredientsList.propTypes = {
  ingredientsList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientsList;
