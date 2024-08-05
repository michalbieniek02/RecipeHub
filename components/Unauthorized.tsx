import { Button } from "@/components/ui/button";
import { signIn } from 'next-auth/react';

export default function Unauthorized() {
  return (
    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl pt-[30%] md:pt-[15%] px-[10%] sm:px-[30%] font-extralight text-center "><h1 className="pb-10 md:pb-2">You'll need an account for full experience </h1>
<Button onClick={()=>signIn()}>Log In</Button>
</div>
  )
}
