// ══════════════════════════════════════════════════════
// FILE: layout.js
// PURPOSE: The root layout that wraps every page. Its main job
// here is loading the font and making it available to the rest
// of the app.
// TYPE: Server Component (no 'use client'). Layouts are Server
// Components by default, and this one doesn't need any state
// or event handlers, so there's no reason to change that.
// ══════════════════════════════════════════════════════
import { Inter } from "next/font/google";
import "./globals.css";

// next/font downloads the font at build time instead of
// fetching it from Google at runtime, which avoids layout
// shift while the page loads. The "variable" option turns it
// into a CSS variable I use in globals.css.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Task Manager",
  description: "A simple task manager built with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-body text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
