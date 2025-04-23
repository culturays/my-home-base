import { ThemeSwitcher } from "./theme-switcher"


const Footer = () => {
  return (
    <div>
    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16 bg-gray-800 text-white py-8">
     
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Nuttis Errands. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="hover:text-gray-300">
              Facebook
            </a>
            <a href="#" className="hover:text-gray-300">
              Instagram
            </a>
            <a href="#" className="hover:text-gray-300">
              Twitter
            </a>
          </div>
        </div>
 <p>
   Powered by{" "}
     <a href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    Supabase
                  </a>
                </p>
                <ThemeSwitcher />
              </footer> 
    </div>
  )
}

export default Footer
