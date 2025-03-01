import ReactMarkdown from "react-markdown";

// eslint-disable-next-line react/prop-types
function Recipe({ recipe }) {
  return (
    <div className="recipe-container">
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </div>
  );
}

export default Recipe;
