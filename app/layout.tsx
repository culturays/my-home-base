
import HeaderAuth from "@/components/header-auth";  
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "GoWork | Online Chore Providers",
  description: "A platform that connects people with trusted providers and menial task workers who can handle their everyday errands/chores — from housekeeping and cleaning to outdoor tasks and miscellaneous jobs. Welcome to GoWork, Your Service Marketplace",

 generator: 'GoWork | Chore Providers',
  applicationName: 'GoWork',
  referrer: 'origin-when-cross-origin',
  keywords:"Work, Online Market, Market, Chores, Jobs in Nigeria",
  authors: [{ name: 'Christina Ngene' }],
  creator: 'Christina Ngene',
  publisher: 'Christina Ngene',
 
  openGraph: {
  title: 'GoWork Naija | Chore Providers',
  description: 'This is a platform that connects people with trusted providers and menial task workers who can handle their everyday errands/chores — from housekeeping and cleaning to outdoor tasks and miscellaneous jobs. Welcome to GoWork, Your Service Marketplace',
  url: 'https://gowork.africareinvented.com/', 
  siteName: 'GoWork', 
  images: [
  {
  url: 'https://gowork.africareinvented.com/logo-t.JPG',  
  width: 800,
  height: 600,
  alt: 'GoWork Image & Logo',
  },
    {
          url: 'https://gowork.africareinvented.com/logo-t.JPG', 
          width: 1800,
          height: 1600,
          alt: 'GoWork Image & Logo',
        },
      ], 
      locale: 'en_NG',
      type: 'website',
    },
    robots: {
      // index: false,
      // follow: true,
      // nocache: true,
      googleBot: {
        index: true,
       // follow: false,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      } ,
    },
   
    icons: { 
      shortcut: ['/favicon.ico'],
      apple: [
        { url: '/favicon.ico' }, 
      ],
   
    },
  
    alternates: {
      canonical: 'https://gowork.africareinvented.com/', 
      languages: { 
          'en-US': '/en-US',          
      },
    },
   
   manifest: 'https://gowork.africareinvented.com/site.webmanifest',
    twitter: {
      card: 'summary_large_image',
      title: 'GoWork | Chore Providers',
      description: 'This is a platform that connects people with trusted providers and menial task workers who can handle their everyday errands/chores — from housekeeping and cleaning to outdoor tasks and miscellaneous jobs. Welcome to GoWork, Your Service Marketplace.',    
      images: ['https://gowork.africareinvented.com/logo-t.JPG'],  
    },    
    
    verification: {
      google: 'google',  
    },
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
          <main className="min-h-screen">
            <div className="w-full">
                <div className="w-full flex justify-between items-center p-5 text-sm bg-teal-700 text-white shadow-md">
                     <Header/>
                      <HeaderAuth /> 
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
