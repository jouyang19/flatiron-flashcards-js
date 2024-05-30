import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { MyProvider } from "@/components/UserContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MyProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <NavBar />
            {children}
          </ThemeProvider>
        </MyProvider>
      </body>
    </html>
  );
}
