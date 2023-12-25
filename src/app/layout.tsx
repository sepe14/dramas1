import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";

import "./globals.css";
import styles from "./main.module.css";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Megnézett sorozatok listája",
  description: "Megnézett dél-koreai sorozatok listája",
};

const displayFont = Space_Mono({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-display",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <body className={displayFont.variable}>
        <Navigation />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
