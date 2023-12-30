import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";

import "./globals.css";
import styles from "./main.module.css";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Suspense, useState } from "react";
import Loading from "./loading";
import UserProvider from "./user-provider";
import UserList from "@/components/userlist";
import { prisma } from "@/db";

export const metadata: Metadata = {
  title: "Megnézett sorozatok listája",
  description: "Megnézett dél-koreai sorozatok listája",
};

const displayFont = Space_Mono({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-display",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const Users = await prisma.users.findMany();

  return (
    <html lang="hu">
      <body className={displayFont.variable}>
        <Navigation />
        <UserProvider Users={Users}>{children}</UserProvider>
        <Footer />
      </body>
    </html>
  );
}
