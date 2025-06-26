"use client" 
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ErrandProps, ProfileProps } from "@/app/types";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from '@/components/StripePaymentForm'; 
import { deleteData } from "@/app/dashboard/actions/get-listed-items";
import { useRouter } from "next/navigation";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!); 

const JobView = ({product, user_errands, related, id, data }:{product:ErrandProps, user_errands:ErrandProps[],related:ErrandProps[], id:number|string, data:ProfileProps}) => {
  const [clientSecret, setClientSecret] = useState('');
 const [showEl, setShowEl]=useState(false)
 const router= useRouter()
  useEffect(() => { 
  fetch(`/api/stripe/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, amount:product.amount, email:data.email, user_full_name:data?.full_name, job_title:product.title, user_id:data?.id }),
    })
      .then((res) => res.json()) 
      .then((data) => 
       setClientSecret(data.clientSecret)
     );
 
return
  }, [product]);

const actionElement=()=>{
if(product.user_id === data?.id){
  setShowEl(prev => !prev)
}
}
const deleteElement=async()=>{
if(product.user_id === data?.id){
   deleteData(data?.id)
}
}
 
 const appearance = { theme: 'stripe' as "flat" | "stripe" | "night" | undefined} ; 
  return clientSecret ? (
   <div> 
   <div className="max-w-5xl m-auto"> 
  {product.user_id === data?.id
  &&<> <button      
      onClick={actionElement}
        type="button"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-200 w-full sm:w-auto m-1"
      >
       Start Payment
      </button>
  <Link href={{
        pathname: '/dashboard/create/',
        query: { id: product.id },
      }}><button  
        type="button"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-200 w-full sm:w-auto m-1"
      >
        Edit
      </button></Link> 
        <button      
        onClick={deleteElement}
        type="button"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-200 w-full sm:w-auto m-1"
      >
        Delete
      </button>
     </>}
  {showEl&& <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <StripePaymentForm jobId={id} />   
    </Elements>} 
      </div> 
    <main className="max-w-6xl mx-auto px-4 py-10"> 
       <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-3xl mb-4">Your Pending Payments</h1>
      {user_errands.length === 0 ? (
        <p>...</p>
      ) : (
        <> 
     <div className="max-w-4xl mx-auto mt-10 p-4 bg-white dark:bg-black shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-teal-600">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Price (₦)</th>
              
            </tr>
          </thead>
          <tbody>
            {user_errands.map((product) => (
              <tr key={product.id} className="hover:text-gray-50">
                <td className="px-4 py-2 border-b">Item: {product.id}</td>
                <td className="px-4 py-2 border-b">{product.title}</td>
                <td className="px-4 py-2 border-b">₦{product.amount.toLocaleString()}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
 </>
      )}
    </div> 
    </main> 
    </div>
  ) : (
    <p>Loading...</p>
  ); 
 
}

export default JobView
