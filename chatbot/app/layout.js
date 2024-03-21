import { Inter } from "next/font/google";
import "./globals.css";
import  { Metadata } from "next";
import { Suspense } from 'react'


export const metadata = {
  title: "Perfume GPT",
  description: "perfume recommendation GPT",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="min-h-screen  w-full h-full">
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
