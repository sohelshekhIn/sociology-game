import type { Metadata } from "next";
import { Poppins, Concert_One } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const poppins = Poppins({
  weight: ["500", "600"],

  subsets: ["latin"],
});

const concrt_one = Concert_One({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "SocioLife: A Journey Through Sociological Imagination - SOCI16039G Introduction to Sociology 1245_68575",
  description:
    "SocioLife - Simulation of Sociological Imagination of an artificial character. Assignment 1 for SOCI16039G Introduction to Sociology 1245_68575 by Sohel Shekh 991759597. Developed by Sohel Shekh (sohel.tech) ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={concrt_one.className}>
        <div className="w-[60vw] mx-auto bg-white text-4xl text-text border-x h-[100dvh]">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
