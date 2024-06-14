import type { Metadata } from "next";
import { Poppins, Concert_One } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";

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
        <div className="w-full lg:w-[50vw] relative mx-auto bg-white text-4xl text-text border-x min-h-[100dvh] h-auto">
          <Navbar />
          {children}
          <div className="absolute bottom-0 p-2 w-full bg-accent font-sans text-xs">
            <span className="mx-auto">
              Made by{" "}
              <Link
                target="_blank"
                className="underline"
                href="https://sohel.tech?ref=sociolife"
              >
                Sohel Shekh
              </Link>
            </span>
          </div>
        </div>
      </body>
    </html>
  );
}
