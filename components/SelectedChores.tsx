 "use client"

import { ErrandProps } from "@/app/types";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

 const SelectedChores= ({persons_errands}:{persons_errands:ErrandProps[]}) =>{
  //   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [cart, setCart] = useState<ErrandProps[]>(persons_errands);
  const removeFromCart = (id:number| string) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const clearCart = () => setCart([]);
    return (
      <main className=" ">
          {/* Breadcrumbs */}
      <nav className="text-xl mb-6 text-gray-500 w-max">
        <Link href={'/dashboard'}><p className="border p-6 text-left"><FontAwesomeIcon icon={faAngleRight}/></p></Link>
      </nav>
        <h1 className="text-3xl mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="border p-4 rounded flex justify-between">
                  <div>
                    <h2 className="font-medium">{item.title}</h2>
                    <p>Desc: {item.desc}</p>
                    <p>Loc: {item.loc}</p>
                    {/* <p>From {item.price }</p> */}
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                    Remove
                  </button> 
                </li>
              ))}
            </ul>
           <div className="mt-6">
              {/*  <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p> */}
              <button onClick={clearCart} className="mt-4 px-4 py-2 bg-gray-800 text-white rounded">
                Clear Cart
              </button>
            </div>
          </>
        )}
      </main>
    );
  }
  export default SelectedChores