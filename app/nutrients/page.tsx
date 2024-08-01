'use client';
import { useState } from "react";
import { z, ZodError } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Food from "../../public/food.webp";
import { fetchRecipes, fetchRecipeById  } from '../../utils/fetchRecipes';
import { Recipe, Ingredient } from "../../utils/fetchRecipes";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { Label } from "@/components/ui/label"



const nutrientSchema = z.object({
  protein: z.object({
    min: z.preprocess((val:any) => parseFloat(val), z.number().nonnegative("Protein min can't be 0")),
    max: z.preprocess((val:any) => parseFloat(val), z.number().nonnegative("Protein max can't be 0")),
  }).refine(data => data.min <= data.max, {
    message: "Protein min should be less than or equal to Protein max",
    path: ["protein"],
  }),
  fat: z.object({
    min: z.preprocess((val:any) => parseFloat(val), z.number().nonnegative("Fat min can't be 0")),
    max: z.preprocess((val:any) => parseFloat(val), z.number().nonnegative("Fat max can't be 0")),
  }).refine(data => data.min <= data.max, {
    message: "Fat min should be less than or equal to Fat max",
    path: ["fat"],
  }),
  carbs: z.object({
    min: z.preprocess((val:any) => parseFloat(val), z.number().nonnegative("Carbs min can't be 0")),
    max: z.preprocess((val:any) => parseFloat(val), z.number().nonnegative("Carbs max can't be 0")),
  }).refine(data => data.min <= data.max, {
    message: "Carbs min should be less than or equal to Carbs max",
    path: ["carbs"],
  }),
});


type NutrientFormData = z.infer<typeof nutrientSchema>;
type Errors = Record<string, string>;

export default function Page() {
    const [formState,setFormState] = useState({
        proteinMin:0,
        proteinMax:997,
        fatMin:0,
        fatMax:997,
        carbMin:0,
        carbMax:997
    })
  
    
    const [errors, setErrors] = useState<Errors>({});
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [instructions, setInstructions] = useState<string[]>([]);
    

    const openModal = async (recipeId: number) => {
        const recipe = await fetchRecipeById(recipeId);
        setSelectedRecipe(recipe);
        setIngredients(recipe.ingredients||[])
        setInstructions(recipe.instructions||[])
      };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        const formData: NutrientFormData = {
            protein: { min: formState.proteinMin, max: formState.proteinMax },
            fat: { min: formState.fatMin, max: formState.fatMax },
            carbs: { min: formState.carbMin, max: formState.carbMax },
        };
        getRecipes();
        try {
            nutrientSchema.parse(formData);
      setErrors({});
      console.log(formData);
    } catch (e) {
      if (e instanceof ZodError) {
        const errorObject = e.errors.reduce((acc, curr) => {
          const path = curr.path.join(".");
          acc[path] = curr.message;
          return acc;
        }, {} as Errors);
        setErrors(errorObject);
    }
}
};
  

  const getRecipes = async () => {
    setLoading(true);
    const params = {
      minCarbs:formState.carbMin,
      maxCarbs:formState.carbMax,
      minProtein:formState.proteinMin,
      maxProtein:formState.proteinMax,
      minFat:formState.fatMin,
      maxFat:formState.fatMax,
      number:20
    };
    const fetchedRecipes = await fetchRecipes(params);
    setRecipes(fetchedRecipes);
    setLoading(false);
  };

  return (
    <main>
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-10 px-[10%] md:px-[20%]  lg:px-[25%] text-center xl:text-start justify-center items-center "> 
      <div className="list-item list-none mt-[200px]">
        <h1 className="text-5xl sm:text-7xl"> Nutrients</h1>
        <p className="text-xl sm:mb-[25px]">find dishes with specified macros</p>
      </div>
      <form className="mt-10 md:mt-[150px]" onSubmit={handleSubmit}>
        <div className="flex flex-wrap lg:flex-nowrap gap-8 justify-center xl:justify-normal text-center">
          <div className="list-items text-gray-500">
            <div className="text-black">
              <p>Protein</p>
              <p>(g)</p>
            </div>
            <Label className="flex mb-1">min.</Label>
            <Input
              type="number"
              className="flex mb-3 min-w-[110px] justify-end"
              placeholder="0"              
              onChange={(e) => setFormState((prevState)=>({
                ...prevState,
                proteinMin:parseInt(e.target.value),
              }))}
            />
            {errors["protein.min"] && <p className="text-red-500">{errors["protein.min"]}</p>}
            <Label className="flex mb-1">max.</Label>
            <Input
              type="number"
              placeholder="999"
              onChange={(e) => setFormState((prevState)=>({
                ...prevState,
                proteinMax:parseInt(e.target.value),
              }))}
              />
            {errors["protein.max"] && <p className="text-red-500">{errors["protein.max"]}</p>}
            {errors["protein"] && <p className="text-red-500">{errors["protein"]}</p>}
          </div>
          <div className="list-items text-gray-500">
            <div className="text-black">
              <p>Fat</p>
              <p>(g)</p>
            </div>
            <Label className="flex mb-1">min.</Label>
            <Input
              type="number"
              className="mb-3 min-w-[110px]"
              placeholder="0"
              onChange={(e) => setFormState((prevState)=>({
                ...prevState,
                fatMin:parseInt(e.target.value),
              }))}
            />
            {errors["fat.min"] && <p className="text-red-500">{errors["fat.min"]}</p>}
            <Label className="flex mb-1">max.</Label>
            <Input
              type="number"
              placeholder="999"
              onChange={(e) => setFormState((prevState)=>({
                ...prevState,
                fatMax:parseInt(e.target.value),
              }))}
            />
            {errors["fat.max"] && <p className="text-red-500">{errors["fat.max"]}</p>}
            {errors["fat"] && <p className="text-red-500">{errors["fat"]}</p>}
          </div>
          <div className="list-items text-gray-500 ">
            <div className="text-black"><p>Carbohydrates</p>
            <p>(g)</p>
            </div>
            <Label className="flex mb-1">min.</Label>
            <Input
              type="number"
              className="mb-3 min-w-[56px]"
              placeholder="0"              
              onChange={(e) => setFormState((prevState)=>({
                ...prevState,
                carbMin:parseInt(e.target.value),
              }))}
            />
            {errors["carbs.min"] && <p className="text-red-500">{errors["carbs.min"]}</p>}
            <Label className="flex mb-1">max.</Label>
            <Input
              type="number"
              placeholder="999"              
              onChange={(e) => setFormState((prevState)=>({
                ...prevState,
                carbMax:parseInt(e.target.value),
              }))}
            />
            {errors["carbs.max"] && <p className="text-red-500">{errors["carbs.max"]}</p>}
            {errors["carbs"] && <p className="text-red-500">{errors["carbs"]}</p>}
          </div>
        </div>
        <Button className="mt-5 bg-purple-600" type="submit">
          Search
        </Button>
      </form>
        
      </div>
    <div className="flex justify-center px-[25%] mt-24">
      {loading ? (
      <div className=" list-item list-none text-center">
        <p className="xl:text-center ">Insert your goal and search for your dream meal!</p>
        <Image
            src={Food}
            alt="random food"
            className="max-w-full mt-12"
            sizes="150vw"
          ></Image>
      </div>
      ) : (
        <ul className="grid text-center text-sm sm:text-xl md:text-2xl">
          {recipes.map((recipe) => (
            <li className="flex py-2 " key={recipe.id}>
            <Image width={400} height={250} className=' rounded-md' src={recipe.image} alt={recipe.title} />
            <div className="w-full rounded-md bg-gray-100 shadow-md ml-4 p-2 md:py-9">
              <h2 className="mx-auto">{recipe.title}</h2>
              <button className="px-3 bg-white rounded-md border:white active:border-black border-solid border-2 " onClick={()=>openModal(recipe.id)}>Select</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>

      <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed right-0 top-3 z-50 w-18" variant="outline">Directions</Button>
      </SheetTrigger>
      <SheetContent className="text-xl px-10 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl text-purple-500 text-center my-10">{selectedRecipe?.title? selectedRecipe.title :"Choose your meal first!"}</SheetTitle>
        </SheetHeader>
        <div className="chuj">
        <div>Ingredients:</div>
            <ul>
              {selectedRecipe?.ingredients?.map((ingredient, idx) => (
                <li key={idx}>{ingredient.name}: {ingredient.amount}</li>
              ))}
            </ul>
            <div className="list-items" dangerouslySetInnerHTML={{ __html: instructions || '' }}></div>
        </div>
      </SheetContent>
    </Sheet>
      
    </main>
  );
}
