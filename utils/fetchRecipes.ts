


import axios from 'axios';

interface Recipe {
  id: number;
  title: string;
  image: string;
  summary?: string;
  ingredients?: { name: string; amount: string }[];
  instructions?: string[];
}

interface FetchRecipesParams {
  query?: string;
  cuisine?: string;
  excludeCuisine?: string;
  diet?: string;
  intolerances?: string;
  equipment?: string;
  includeIngredients?: string;
  excludeIngredients?: string;
  type?: string;
  instructionsRequired?: boolean;
  fillIngredients?: boolean;
  addRecipeInformation?: boolean;
  addRecipeInstructions?: boolean;
  addRecipeNutrition?: boolean;
  author?: string;
  tags?: string;
  recipeBoxId?: number;
  titleMatch?: string;
  maxReadyTime?: number;
  minServings?: number;
  maxServings?: number;
  ignorePantry?: boolean;
  sort?: string;
  sortDirection?: string;
  minCarbs?: number;
  maxCarbs?: number;
  minProtein?: number;
  maxProtein?: number;
  minCalories?: number;
  maxCalories?: number;
  minFat?: number;
  maxFat?: number;
  offset?: number;
  number?: number;
}
const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
const baseUrl = 'https://api.spoonacular.com/recipes/complexSearch';

export const fetchRecipes = async (params: FetchRecipesParams): Promise<Recipe[]> => {
  const response = await axios.get(baseUrl, {
    params: {
      ...params,
      apiKey,
      addRecipeInformation: true,
    },
  });
  return response.data.results;
};

export const fetchRecipesByName = async (name:string) => {
  const response = await axios.get(`${baseUrl}?${name}`, {
    params: {
      apiKey,
      addRecipeInformation: true,
    },
  });
  return response.data.results;
};

export const fetchRecipesByIngredients = async (ingredients:string[]) => {
  const includeIngredients = ingredients.join(',');
  const url = `${baseUrl}?apiKey=${apiKey}&includeIngredients=${includeIngredients}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchRecipeById = async (id: number): Promise<Recipe> => {
  const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
    params: {
      apiKey,
    },
  });
  return response.data;
};
