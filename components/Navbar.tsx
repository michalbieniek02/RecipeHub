'use client';
import SignInButton from "./SignInButton";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useState } from 'react';
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { data: session, status } = useSession();

  function handleOpen() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <>
      <div className="hidden sm:block">
        <nav className="fixed top-0 flex px-[20%] md:px-[25%] lg:px-[30%] shadow bg-white opacity-85 h-16 w-[100%] justify-between items-center font-semibold text-xl">
          <Link href={'/'}>
            <div className="inline-flex" translate="no">
            Re<span className="text-purple-600" translate="no">cipe</span>Hub            
            </div>
          </Link>
          <Link href={'/recipes'}><Button variant='link'>Recipes</Button></Link> 
          <Link href={'/nutrients'}><Button variant='link'>Nutrients</Button></Link> 
          {session ? (
            <div className="relative">
              <Button variant='link' onClick={handleOpen}>
                {session.user?.name || session.user?.email} ▼
              </Button>
              {isNavOpen && (
                <div className="absolute right-0 w-48 bg-white opacity-85 border border-gray-200 rounded-md shadow-lg mt-">
                  <Link href="/profile"><Button variant='link'>Profile</Button></Link>
                  <Button variant='link' onClick={() => signOut()}>Sign out</Button>
                </div>
              )}
            </div>
          ) : <SignInButton />
          }
        </nav>
      </div>
      
      <div className="block sm:hidden z-50">
        <nav className={`fixed flex px-[10%] shadow bg-white opacity-85 h-16 w-[100%] justify-between items-center font-semibold text-xl `}>
          <Link href={'/'}>
            <div className="inline-flex">
              <p>Re</p><p className='text-purple-600'>cipe</p>Hub 
            </div>
          </Link>
          <p onClick={handleOpen} className={`absolute left-[48%]  ${isNavOpen ? "text-2xl " : "text-3xl -translate-y-1"} z-[999] cursor-pointer`}>{isNavOpen ? '✕' : '☰'}</p>
        </nav>
        {isNavOpen && (
          <div className=' z-[99] fixed min-w-[100%] mx-0 my-0 align-top items-center shadow list-item list-none text-center bg-white opacity-90' onClick={handleOpen}>
            <div className='h-20'></div>
            <div><Link href={'/recipes'}><Button variant='link'>Recipes</Button></Link></div>
            <div><Link href={'/nutrients'}><Button variant='link'>Nutrients</Button></Link></div>
            {session ? (
              <div>
                <div><Link href="/profile"><Button variant='link'>Profile</Button></Link></div>
                <div><Button variant='link' onClick={() => signOut()}>Sign out</Button></div>
              </div>
            ) : (
              <div><SignInButton /></div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
