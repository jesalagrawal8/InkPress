import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InkPress - Modern Blog Platform",
  description:
    "A modern blog platform built with Next.js, TypeScript, and MongoDB. Share your thoughts and stories with the world.",
  keywords: ["blog", "nextjs", "typescript", "mongodb", "writing"],
  authors: [{ name: "InkPress Team" }],
  openGraph: {
    title: "InkPress - Modern Blog Platform",
    description:
      "A modern blog platform built with Next.js, TypeScript, and MongoDB.",
    type: "website",
    locale: "en_US",
    siteName: "InkPress",
  },
  twitter: {
    card: "summary_large_image",
    title: "InkPress - Modern Blog Platform",
    description:
      "A modern blog platform built with Next.js, TypeScript, and MongoDB.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster position="top-right" />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
