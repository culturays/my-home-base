
import HeaderAuth from "@/components/header-auth";  
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import Footer from "@/components/Footer";
import Image from "next/image";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "",
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
              <nav className="w-full flex justify-center h-16 shadow-2xl">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}><h1>My Home</h1></Link>
                 
                  </div>
           <HeaderAuth /> 
                </div>
                   {/* Navigation */}
     
        <div className="container mx-auto flex justify-between">
          <div className="font-bold bg-gray-100 rounded-full"><Image src='/logo-t.JPG' width={200} height={200} alt="logo-image" className="object-cover rounded-full w-16 h-16"/> </div>
          <ul className="flex space-x-8">
          <Link href="/"><li className="hover:text-gray-700">
           Home 
            </li></Link>  
            <Link href="/about"><li className="hover:text-gray-700">
               About 
            </li></Link> 
            <Link href="/services" className="hover:text-gray-700">
               <li>Services</li>                
            </Link>
             
            <Link href="/contact"><li className="hover:text-gray-700">
             Contact 
            </li></Link>  
          </ul>
        </div>
       </nav>
              <div className="flex flex-col  p-5">
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
