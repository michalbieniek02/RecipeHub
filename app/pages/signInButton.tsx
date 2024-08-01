"use client"
 
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
 
export function SignInButton() {
  return <Button variant='link' onClick={() => signIn()}>Sign in</Button>
}
