import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
       remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          port: '',
          pathname: '/**',
          
        },
          {  
          protocol: 'https',
          hostname: 'cgdonystqsigvcjbdxvk.supabase.co',
          port: '',
          pathname: '/**',
          
        }, 
         
      ],
     
   
    },   
   
};

export default nextConfig;
