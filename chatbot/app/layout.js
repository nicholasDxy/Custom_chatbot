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
      <body className="bg-white dark:bg-slate-800">
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
