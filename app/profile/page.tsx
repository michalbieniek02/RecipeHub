'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Unauthorized from "@/components/Unauthorized"
import { useSession } from "next-auth/react"
import Image from "next/image"

export default function page() {
    const {data:session} = useSession()
  return (
    session?
    (<div className="list-item justify-center text-center pt-16  px-[10%] z-0 md:px-[25%] lg:px-[30%] ">
       <h1 className="text-2xl text-purple-500 mb-10"> Your Profile</h1>
       <div className="flex justify-center sm:justify-between">
            <div className="bg-gray-100 rounded p-4">
                <Image src={session.user?.image as string} alt="profile pic" width={100} height={100}></Image>
            </div>
        <div className="text-start">
            <Label>Name
            <Input disabled placeholder={session.user?.name as string} className="w-[220px]" ></Input></Label>
            <Label>E-mail
            <Input disabled placeholder={session.user?.email as string} className="w-[220px]"></Input></Label>         
        </div>
       </div>
    </div>
    ):<Unauthorized/>
  )
}
