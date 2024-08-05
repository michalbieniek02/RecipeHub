import { Button } from "@/components/ui/button"
import { useSession, signIn, signOut } from "next-auth/react"

export default function SignInButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <Button variant='link' onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }
  return (
    <>
      <Button variant='link' onClick={() => signIn()}>Sign in</Button>
    </>
  )
}