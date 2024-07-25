'use client';
import { useState } from "react";
import { z, ZodError } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Food from "../../public/food.webp";
import { fetchRecipes, fetchRecipeById  } from '../../utils/fetchRecipes';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { Label } from "@/components/ui/label"


interface Ingredient {
name: string;
amount: string;
}

interface Recipe {
  id: number;
  title: string;
  image: string;
  summary?: string;
  ingredients?: Ingredient[];
  instructions?: string[];
}

const nutrientSchema = z.object({
    protein: z.object({
        min: z.number().nonnegative("Protein min can't be 0"),
        max: z.number().nonnegative("Protein max can't be 0"),
  }).refine(data => data.min <= data.max, {
      message: "Protein min should be less than or equal to Protein max",
      path: ["protein"],
  }),
  fat: z.object({
    min: z.number().nonnegative("Fat min can't be 0"),
    max: z.number().nonnegative("Fat max can't be 0"),
}).refine(data => data.min <= data.max, {
    message: "Fat min should be less than or equal to Fat max",
    path: ["fat"],
  }),
  carbs: z.object({
    min: z.number().nonnegative("Carbs min can't be 0"),
    max: z.number().nonnegative("Carbs max can't be 0"),
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
        proteinMax:0,
        fatMin:0,
        fatMax:0,
        carbMin:0,
        carbMax:0
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
        console.log(recipe.title);
        console.log(recipe.ingredients);
        setIngredients(recipe.ingredients||[])
        console.log(recipe.instructions);
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
    <main className="grid grid-cols-1 xl:grid-cols-2 px-[10%] md:px-[20%] lg:px-[30%] text-center xl:text-start justify-center items-center pt-[100px]">
      <div className="list-item list-none">
        <h1 className="text-7xl mr-10">Nutrients</h1>
        <p className="text-xl mb-[25px]">find dishes with specified macros</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap lg:flex-nowrap gap-8 justify-center xl:justify-normal text-center">
          <div className="list-items">
            <p>Protein</p>
            <p>(g)</p>
            <Label className="flex">min.</Label>
            <Input
              type="number"
              className="mb-3 min-w-[70px]"
              value={formState.proteinMin}
              onChange={(e) => setFormState((prevState)=>({
                ...prevState,
                proteinMin:parseInt(e.target.value),
              }))}
            />
            {errors["protein.min"] && <p className="text-red-500">{errors["protein.min"]}</p>}
            <Label className="flex">max.</Label>
            <Input
              type="number"
              value={formState.proteinMax}
              onChange={(e) => setFormState((prevState)=>({
                ...prevState,
                proteinMax:parseInt(e.target.value),
              }))}
            />
            {errors["protein.max"] && <p className="text-red-500">{errors["protein.max"]}</p>}
            {errors["protein"] && <p className="text-red-500">{errors["protein"]}</p>}
          </div>
          <div className="list-items">
            <p>Fat</p>
            <p>(g)</p>
            <Label className="flex">min.</Label>
            <Input
              type="number"
              className="mb-3 min-w-[56px]"
              value={formState.fatMin}
              onChange={(e) => setFormState((prevState)=>({
                ...prevState,
                fatMin:parseInt(e.target.value),
              }))}
            />
            {errors["fat.min"] && <p className="text-red-500">{errors["fat.min"]}</p>}
            <Label className="flex">max.</Label>
            <Input
              type="number"
              value={formState.fatMax}
              onChange={(e) => setFormState((prevState)=>({
                ...prevState,
                fatMax:parseInt(e.target.value),
              }))}
            />
            {errors["fat.max"] && <p className="text-red-500">{errors["fat.max"]}</p>}
            {errors["fat"] && <p className="text-red-500">{errors["fat"]}</p>}
          </div>
          <div className="list-items">
            <p>Carbohydrates</p>
            <p>(g)</p>
            <Label className="flex">min.</Label>
            <Input
              type="number"
              className="mb-3 min-w-[56px]"
              value={formState.carbMin}
              onChange={(e) => setFormState((prevState)=>({
                ...prevState,
                carbMin:parseInt(e.target.value),
              }))}
            />
            {errors["carbs.min"] && <p className="text-red-500">{errors["carbs.min"]}</p>}
            <Label className="flex">max.</Label>
            <Input
              type="number"
              value={formState.carbMax}
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

    <div>
      {loading ? (
        <>
        <p>Loading...</p><div className="w-full max-w-full min-w-[250px] md:min-w-[300px] lg:min-w-[600px] xl:min-w-[900px] mt-10">
        <Image
          src={Food}
          width={1000}
          height={450}
          alt="random food"
          layout="responsive"
        ></Image>
      </div>
        </>
      ) : (
        <ul className="grid text-center text-2xl ">
          {recipes.map((recipe) => (
            <li className="flex py-2 " key={recipe.id}>
              <img className='min-w-[400px] rounded-md' src={recipe.image} alt={recipe.title} />
              <div className="min-w-[90%] rounded-md bg-gray-100 shadow-md ml-4 p-2 pt-24">
              <h2>{recipe.title}</h2>
              <button className="px-3 bg-white rounded-md border:white active:border-black border-solid border-2 " onClick={()=>openModal(recipe.id)}>Select</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
   
      <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed right-0 top-3 z-50" variant="outline">Directions</Button>
      </SheetTrigger>
      <SheetContent className="text-xl px-10 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl text-purple-500 text-center my-10">{selectedRecipe?.title? selectedRecipe.title :"Choose your meal first!"}</SheetTitle>
        </SheetHeader>
        <div className="chuj">
            <div>{}</div>
            <div dangerouslySetInnerHTML={{ __html: instructions || '' }}></div>
        </div>
      </SheetContent>
    </Sheet>
      
    </main>
  );
}
