import { useState, useRef, useEffect } from "react";
import IngredientsList from "./ingredientsList";
import GetRecipe from "./getRecipeCard";
import AddIngredient from "./addIngredient";
import Recipe from "./recipe";
import { fetchRecipe } from "../ai";
import { isValidIngredient } from "../isValid";

function MainComponent() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null);

  const recipeSection = useRef(null);

  const addToList = async (FormData) => {
    const ingredient = FormData.get("ingredient")?.trim();
    const valid = await isValidIngredient(ingredient);
    if (
      valid &&
      ingredient !== "" &&
      ingredient.length > 2 &&
      ingredient !== "aaa"
    ) {
      console.log(ingredient);
      setIngredients((ingredients) => [...ingredients, ingredient]);
    } else alert("please enter a valid ingredient");
  };

  useEffect(() => {
    if (recipe && recipeSection)
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
  }, [recipe]);
  return (
    <div>
      <AddIngredient addToList={addToList} />
      {ingredients.length > 0 && (
        <div>
          <IngredientsList ingredientsList={ingredients} />
          {ingredients.length > 3 && (
            <GetRecipe
              fetchRecipe={fetchRecipe}
              ingredients={ingredients}
              setRecipe={setRecipe}
              ref={recipeSection}
            />
          )}
          {recipe && <Recipe recipe={recipe} />}
        </div>
      )}
    </div>
  );
}

export default MainComponent;
