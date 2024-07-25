"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    
    <main className='flex px-[20%] md:px-[25%] lg:px-[30%] justify-center items-center pt-[100px]'>
      
      <div className="list-item list-none">
        <h1 className=" text-7xl">Hello {user.firstName}</h1>
        <p className="text-xl pt-[20px]">whatchu wanna eat today?</p>
      </div>
      
       <div className="flex gap-5 ">
        <Link href={'/recipes'}>
          <Button className="bg-purple-500">Recipes</Button>
        </Link>
        <Link href={'/nutrients'}>
          <Button className="bg-gray-600">Nutrients</Button>
        </Link>
       </div>

      
    
      <div>
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
    </main>
    
  );
}

