"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    
    <main className='md:flex px-[10%] md:px-[25%] lg:px-[30%] justify-center items-center '>
      
      <div className="list-item list-none text-center md:text-start pt-[200px]">
        <div className="text-4xl md:text-7xl ">
          <h1 className="font-medium">Hello</h1>
          <h1 className="text-purple-500">{user.firstName}</h1>
        </div>
        <p className="text-xl pt-[20px]">what is crucial for you today?</p>
      </div>
      
       <div className="flex ml-10 gap-5 mt-6 md:mt-0 justify-evenly md:justify-normal">
        <Link href={'/recipes'}>
          <Button className="bg-purple-500">Recipes</Button>
        </Link>
        <Link href={'/nutrients'}>
          <Button className="bg-gray-600">Nutrients</Button>
        </Link>
       </div>
    </main>
    
  );
}

