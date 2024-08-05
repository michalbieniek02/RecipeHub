import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"


export const authOptions: NextAuthOptions = {
    providers:[
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret : process.env.AUTH_GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET as string
        }),
    ]
}
