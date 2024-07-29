'use client'
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
  import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  function handleOpen() {
    setIsNavOpen(!isNavOpen)
  }
  return (
    <>
      <div className="hidden sm:block">
        <SignedOut>
            <nav className="fixed flex px-[20%] md:px-[25%] lg:px-[30%] shadow bg-white h-16 w-[100%] justify-between items-center font-semibold text-xl">
                <div className="inline-flex">
                  Re<p className='text-purple-600'>cipe</p>Hub
                </div>
                <SignInButton/>
            </nav>
        </SignedOut>
        <SignedIn>
            <nav className="fixed flex px-[20%] md:px-[25%] lg:px-[30%] shadow bg-white h-16 w-[100%] justify-between items-center font-semibold text-xl">
                <Link href={'/'}>
                  <div className="inline-flex">
                    <p>Re</p><p className='text-purple-600'>cipe</p><p>Hub</p> 
                  </div>
                </Link>
                
                <Link href={'/recipes'}><Button variant='link'>Recipes</Button></Link> 
                <Link href={'/nutrients'}><Button variant='link'>Nutrients</Button></Link> 
                <UserButton/>
            </nav>
        </SignedIn>
        </div>
        <div className="block sm:hidden">
          <SignedOut>
            <nav className="fixed flex px-[20%] shadow bg-white h-16 w-[100%] justify-between items-center font-semibold text-xl">
                <div className="inline-flex">
                  Re<p className='text-purple-600'>cipe</p>Hub
                </div>
                <SignInButton/>
            </nav>
          </SignedOut>
          <SignedIn>
            <nav className="fixed flex px-[10%] md:px-[25%] lg:px-[30%] shadow bg-white h-16 w-[100%] justify-center items-center text-center font-semibold text-sm sm:text-xl">
                <Link href={'/'}>
                  <div className="absolute left-5 top-6 inline-flex">
                    <p>Re</p><p className='text-purple-600'>cipe</p><p>Hub</p> 
                  </div>
                </Link>
                <p onClick={handleOpen} className='absolute top-3 text-3xl cursor-pointer'>{isNavOpen?'✕':'☰'}</p>
                </nav>
                {isNavOpen? 
                (<div className='fixed min-w-[100%] mx-0 my-0 align-top items-center shadow list-item list-none text-center ' onClick={handleOpen}>
                  <div className='h-20'></div>
                  <div><UserButton /></div>
                  <div><Link href={'/recipes'}><Button variant='link'>Recipes</Button></Link></div>
                  <div><Link href={'/nutrients'}><Button variant='link'>Nutrients</Button></Link></div>
                </div>
                ):(<></>)}
        </SignedIn>
        </div>
    </>
)
}