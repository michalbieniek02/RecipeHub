import NextAuth from "next-auth"
import facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"
import google from "next-auth/providers/google"
 
const googleSecret = process.env.GOOGLE_CLIENT_SECRET
const googleId = process.env.GOOGLE_CLIENT_ID

export const { handlers, auth } = NextAuth({
  providers: [GitHub,facebook,google({
    clientSecret:googleSecret,
    clientId:googleId
  })],
  callbacks: {
    async session({ session, user }) {
      session.user.image = user.image;
      session.user.name = user.name;
      return session;
    },
  },
})


