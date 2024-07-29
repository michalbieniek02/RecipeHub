'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { fetchRecipesByName,fetchRecipesByIngredients } from '../../utils/fetchRecipes';
import Food from "../../public/food.webp"
import { useState } from "react";
export default function page() {

  const [recipeName, setRecipeName] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRecipeSubmit = async ()=>{
    setLoading(true)
    const fetchedRecipes = await fetchRecipesByName(recipeName)
    setRecipes(fetchedRecipes)
    setLoading(false)
  }
 
  
  const searchRecipesByIngredients = async () => {
    setLoading(true);
    const ingredientsArray = ingredients.split(',')
    const fetchedRecipes = await fetchRecipesByIngredients(ingredientsArray);
    setRecipes(fetchedRecipes);
    setLoading(false);
  };

  
  return (
    <main className='grid grid-cols-1 xl:grid-cols-2 px-[10%] md:px-[20%] lg:px-[30%] text-center xl:text-start justify-center items-center pt-[200px]'>
      
      <div className="list-item list-none">
        <h1 className=" text-7xl mr-10">Recipes</h1>
        <p className="text-xl mb-[25px]">find dishes with specified macros</p>
      </div>
      
      <div className="list-item list-none justify-center xl:justify-normal text-center">
        <form onSubmit={handleRecipeSubmit} className="flex gap-2">
          <Input placeholder="search recipe..." onChange={(e)=>setRecipeName(e.target.value)}/>
          <Button className=" bg-purple-600" type="submit">⇥</Button>
        </form>
        <form onSubmit={searchRecipesByIngredients} className="flex mt-10 gap-2" > 
        <Input placeholder="search ingredients..." onChange={(e)=>setIngredients(e.target.value)}/>
        <Button className=" bg-purple-600" type="submit">⇥</Button>
        </form>
      </div>
   
      
      <div className="w-full max-w-full min-w-[250px] md:min-w-[300px] lg:min-w-[600px] xl:min-w-[900px] mt-10">
      <Image src={Food} width={1000} height={450} alt="random food" layout="responsive" ></Image>
    </div>

    
    </main>
  );
}
