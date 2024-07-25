import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Food from "../../public/food.webp"
export default function page() {
  return (
    <main className='grid grid-cols-1 xl:grid-cols-2 px-[10%] md:px-[20%] lg:px-[30%] text-center xl:text-start justify-center items-center pt-[100px]'>
      
      <div className="list-item list-none">
        <h1 className=" text-7xl mr-10">Recipes</h1>
        <p className="text-xl mb-[25px]">find dishes with specified macros</p>
      </div>
      
       <div className="flex flex-wrap lg:flex-nowrap gap-2 justify-center xl:justify-normal text-center">

          <Input placeholder="start typing..."/>
        <Button className=" bg-purple-600" type="submit">Search</Button>
        </div>
   
      
      <div className="w-full max-w-full min-w-[250px] md:min-w-[300px] lg:min-w-[600px] xl:min-w-[900px] mt-10">
      <Image src={Food} width={1000} height={450} alt="random food" layout="responsive" ></Image>
    </div>
    </main>
  );
}
