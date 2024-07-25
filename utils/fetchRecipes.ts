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

export const fetchRecipes = async (params: FetchRecipesParams): Promise<Recipe[]> => {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
    params: {
      ...params,
      apiKey,
      addRecipeInformation: true,
    },
  });
  return response.data.results;
};

export const fetchRecipeById = async (id: number): Promise<Recipe> => {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
    params: {
      apiKey,
    },
  });
  return response.data;
};
