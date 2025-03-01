import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe that the user could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they did't mention,but not to include too many extra ingredients. Format the response in markdown to make it easier to render to a web page.`;

const hf = new HfInference(import.meta.env.VITE_HUGGING_FACE_ACCESS_TOKEN);

export const fetchRecipe = async (ingredientArr, servingAmount) => {
  const ingredientString = ingredientArr.join(", ");
  try {
    const res = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientString} and ${servingAmount} number of people to serve. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });
    return res.choices[0].message.content;
  } catch (error) {
    console.error(error.message);
  }
};
