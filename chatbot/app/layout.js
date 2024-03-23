import { Inter } from "next/font/google";
import "./globals.css";
import  { Metadata } from "next";
import { Suspense } from 'react'


export const metadata = {
  title: "PDF GPT",
  description: "Chat with PDF",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-white to-pink-50 min-h-screen  w-full h-full">
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
