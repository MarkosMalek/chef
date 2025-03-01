// eslint-disable-next-line react/prop-types
function AddIngredient({ addToList }) {
  return (
    <form action={addToList} className="input-form">
      <input
        type="text"
        placeholder="e.g. oregano"
        className="input"
        name="ingredient"
      />
      <button>+ Add ingredient</button>
    </form>
  );
}

export default AddIngredient;
