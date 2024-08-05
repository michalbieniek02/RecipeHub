'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { fetchRecipesByName, fetchRecipesByIngredients, fetchRecipeById } from '../../utils/fetchRecipes';
import Food from "../../public/food.webp";
import { useState } from "react";
import { Recipe } from "../../utils/fetchRecipes";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useSession } from "next-auth/react";
import Unauthorized from "@/components/Unauthorized";

export default function Page() {
  const [recipeName, setRecipeName] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState<string[]>([]);

  const handleRecipeSubmit = async (e:any) => {
    e.preventDefault(); 
    const fetchedRecipes = await fetchRecipesByName(recipeName);
    setRecipes(fetchedRecipes);
    setLoading(false);
  };

  const searchRecipesByIngredients = async (e:any) => {
    e.preventDefault();  
    const ingredientsArray = ingredients.split(',');
    const fetchedRecipes = await fetchRecipesByIngredients(ingredientsArray);
    setRecipes(fetchedRecipes);
    setLoading(false);
  };

  const openModal = async (recipeId: number) => {
    const recipe = await fetchRecipeById(recipeId);
    setSelectedRecipe(recipe);
    setInstructions(recipe.instructions||[])
    
  };
  const {data:session} = useSession()


  return (
    session?(<main className='px-[10%] md:px-[20%] lg:px-[30%] text-center xl:text-start justify-center items-center pt-[200px]'>
      <div className="grid grid-cols-1 xl:grid-cols-2">

      
      <div className="list-item list-none">
        <h1 className="text-7xl mr-10">Recipes</h1>
        <p className="text-xl mb-[25px]">find dishes with specified macros</p>
      </div>

      <div className="list-item list-none justify-center xl:justify-normal text-center">
        <form onSubmit={handleRecipeSubmit} className="flex gap-2">
          <Input placeholder="search recipe..." onChange={(e) => setRecipeName(e.target.value)} />
          <Button className="bg-purple-600" type="submit">⇥</Button>
        </form>
        <form onSubmit={searchRecipesByIngredients} className="flex mt-10 gap-2">
          <Input placeholder="search ingredients..." onChange={(e) => setIngredients(e.target.value)} />
          <Button className="bg-purple-600" type="submit">⇥</Button>
        </form>
      </div>
      </div>

    <div className="grid text-center text-sm sm:text-xl md:text-2xl">
      {recipes.map((recipe: Recipe) => (
        <li className="flex py-2 " key={recipe.id}>
          <div className="w-full h-full max-w-[400px] max-h-[250px] overflow-hidden rounded-md">
            <Image 
              width={400} 
              height={250} 
              className='object-cover w-[120%] h-[120%] ' 
              src={recipe.image} 
              alt={recipe.title} />
          </div>
          <div className="w-full rounded-md bg-gray-100 shadow-md ml-4 p-2 md:py-9">
          <h2 className="mx-auto text-sm md:text-xl">{recipe.title}</h2>
          <button className="px-3 text-sm  bg-white rounded-md border:white active:border-black border-solid border-2 " onClick={()=>openModal(recipe.id)}>Select</button>
          </div>
      </li>
        ))}
    </div>
    

       
        {loading ? <Image src={Food} width={1000} height={450} className="mt-10" alt="random food" /> : <></>}

      <Sheet>
      <SheetTrigger >
        <Button className="fixed right-0 top-3 z-50 w-18" variant="outline">Directions</Button>
      </SheetTrigger>
      <SheetContent className="text-xl px-10 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl text-purple-500 text-center my-10">{selectedRecipe?.title? selectedRecipe.title :"Choose your meal first!"}</SheetTitle>
        </SheetHeader>
        <div className=">_<">
            <div className="list-items" dangerouslySetInnerHTML={{ __html: instructions || '' }}></div>
        </div>
      </SheetContent>
    </Sheet>
    </main>
):<Unauthorized/>
    
  );
}