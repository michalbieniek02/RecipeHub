import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
  import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Navbar() {
  return (
    <>
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
    </>
)
}