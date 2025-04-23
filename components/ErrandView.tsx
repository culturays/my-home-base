"use client"

import { useState } from "react";
import Image from "next/image";
import SelectedChores from "./SelectedChores";
import { getMyErrands } from "@/app/products/return-products";
import Link from "next/link";
import { Item } from "@radix-ui/react-dropdown-menu";
import { ErrandProps } from "@/app/types";

const ErrandView = ({product, persons_errands, related}:{product:ErrandProps, persons_errands:ErrandProps[],related:ErrandProps[]}) => {
     const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
        const [selectedColor, setSelectedColor] = useState<{ name: string; value: string; image: string } | null>(null);
        const [cart, setCart] = useState<ErrandProps[]>([]);
        const [isLoading, setIsLoading] = useState(false); 
        const handleOptionChange = (optionName: string, value: string) => {
            setSelectedOptions({ ...selectedOptions, [optionName]: value });
        };
    
        const handleColorSelect = (color: { name: string; value: string; image: string }) => {
            setSelectedColor(color);
        };
    
        const handleSelectItem = () => {
            setIsLoading(true);
            // Simulate adding to cart or redirecting to checkout
            setTimeout(() => {
                setIsLoading(false);
                alert('Added to cart! (Simulated)');
               
            }, 1000);
        };

        const addToErrands = () => {
          // setCart((prev) => {
          //   const exists = prev.find((i) => i.id === product.id);
          //   if (exists) {
          //     return prev.map((i) =>
          //       i.id === product.id ? { ...i, quantity: i.quantity + product.quantity } : i
          //     );
          //   }
          //   return [...prev, product];
          // });
        };
        const removeFromCart = (id:number| string) =>
            setCart((prev) => prev.filter((item) => item.id !== id));
        
          const clearCart = () => setCart([]);
          // const total = cart.reduce((sum, item) => sum + item.price * item.noofhousesforchores, 0);
  return (
    <div> 
    <main className="max-w-6xl mx-auto px-4 py-10 text-gray-800">      <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl mb-4">Your Cart</h1>
      {persons_errands.length === 0 ? (
        <p>You Have no Errands to Run.</p>
      ) : (
        <>
           <ul className="space-y-4">
            {persons_errands.map((item) => (
              <li key={item.id} className="border p-4 rounded flex justify-between">
                <div>
                  <h2 className="font-medium">{item.title}</h2>
                  <p>Desc: {item.desc}</p>
                  
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                  Remove
                </button>
              </li>
            ))}
          </ul>  
          <div className="mt-6">
           <button onClick={clearCart} className="mt-4 px-4 py-2 bg-gray-800 text-white rounded">
              Clear All
            </button>
          <Link href={`/selected/chores/${product.user_id}`}><button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"> See All </button></Link>          
          
          </div>
        </>
      )}
    </div>
      {/* Related Products */}
      <section>
        <h2 className="text-2xl font-serif mb-6">Related Chores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((item)=> (
            <div key={item?.title} className="border p-4 rounded text-center"> 
              <div className="w-full h-40 relative mb-3">
                <Image  src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/files/${item.images[0]}`} alt={item.title} layout="fill" objectFit="contain" />
              </div>
              <Link href={`/errand/${item.slug}`}><p className="font-medium">{item.title}</p></Link>
              <p className="text-gray-500">{item.desc}</p>
               <p className="text-gray-500">{item.loc}</p>
            </div>
          )) }  
        </div>  
      </section>
    </main>
   
  </div>
  )
}

export default ErrandView
