// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/react"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boutiti Med Amine - Portfolio",
  description: "Software Engineer & Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Enveloppez l'application entière avec le Provider */}
        <LanguageProvider> 
          {children}
        </LanguageProvider>
        
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}