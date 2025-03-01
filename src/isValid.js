const validIngredients = new Set([
  "tomato",
  "potato",
  "onion",
  "carrot",
  "garlic",
  "chicken",
  "beef",
  "salt",
  "pepper",
  "rice",
  "pasta",
  "milk",
  "butter",
  "cheese",
  "apple",
  "banana",
  "strawberry",
  "lettuce",
  "broccoli",
]);

const cache = new Map(); // Cache to store API responses

async function isValidEnglishWord(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
    word
  )}`;
  try {
    const response = await fetch(url);
    if (!response.ok) return false;
    const data = await response.json();
    return Array.isArray(data) && data.length > 0;
  } catch (error) {
    console.error("Error checking dictionary API:", error);
    return false;
  }
}

export async function isValidIngredient(ingredient) {
  if (!ingredient || typeof ingredient !== "string") return false;
  ingredient = ingredient.trim().toLowerCase();

  // Ensure input is a single word (no spaces or special characters)
  if (!/^[a-zA-Z]+$/.test(ingredient)) return false;

  // Check if the word exists in English dictionary
  const isEnglishWord = await isValidEnglishWord(ingredient);
  if (!isEnglishWord) return false;

  // Check in predefined ingredient list
  if (validIngredients.has(ingredient)) return true;

  // Check in cache
  if (cache.has(ingredient)) return cache.get(ingredient);

  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
    ingredient
  )}&search_simple=1&json=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API request failed: ${response.status}`);

    const data = await response.json();
    const isValid = data.products && data.products.length > 0;

    cache.set(ingredient, isValid); // Store result in cache
    return isValid;
  } catch (error) {
    console.error("Error fetching ingredient data:", error);
    return false;
  }
}
