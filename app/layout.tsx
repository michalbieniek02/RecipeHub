import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  SignedOut
} from '@clerk/nextjs'

import "./globals.css";
import Navbar from "@/components/Navbar";
import HomeUnauth from "@/pages/HomeUnauth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
      <SignedOut>
        <Navbar/>
        <HomeUnauth/>
      </SignedOut>
      <SignedIn>
        <Navbar/>
        {children}
      </SignedIn>
        </body>
    </html>

    </ClerkProvider>
  );
}

