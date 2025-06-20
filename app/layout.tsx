
import HeaderAuth from "@/components/header-auth";  
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import Footer from "@/components/Footer";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import Header from "@/components/Header";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "E-run",
  description: "",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <div className="w-full flex justify-center shadow-2xl">
                <div className="w-full flex justify-between items-center p-5 text-sm bg-teal-700 text-white shadow-md">
                     <Header/>
                      <HeaderAuth />  
                </div> 
          </div>
          <div className="flex flex-col p-5">
                {children}
              </div>
            </div>
          </main>
          <Footer/>
       
        </ThemeProvider>
      </body>
    </html>
  );
}
