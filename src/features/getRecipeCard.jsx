import { useState } from "react";

/* eslint-disable react/prop-types */
function GetRecipe({ ingredients, fetchRecipe, setRecipe, ref }) {
  const [servings, setServings] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchRecipe(ingredients, servings);
    setRecipe(data);
    setServings(1);
  };
  return (
    <form className="getRecipe-card" onSubmit={handleSubmit}>
      <section ref={ref}>
        <h2>Ready for a recipe?</h2>
        <p>Generate a recipe from your list of ingredients.</p>
        <label
          htmlFor="servings"
          style={{
            fontFamily: "sans-serif",
            color: "#6b7280",
            marginRight: "0.5rem",
            fontSize: "0.9rem",
          }}
        >
          Number of Servings:
        </label>
        <input
          type="number"
          id="servings"
          onChange={(e) => setServings(e.target.value)}
          value={servings}
          min="1"
          style={{ width: "3rem" }}
        />
      </section>
      <button>Get a recipe</button>
    </form>
  );
}

export default GetRecipe;
