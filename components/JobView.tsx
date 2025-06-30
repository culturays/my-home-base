"use client" 
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ErrandProps, PaymentProps, ProfileProps } from "@/app/types"; 
import { deleteData } from "@/app/dashboard/actions/get-listed-items";
import { useRouter } from "next/navigation";  

const JobView = ({product, id, data }:{product:ErrandProps, id:number|string, data:ProfileProps}) => {
 
const [email, setEmail] = useState('')
const [amount, setAmount] = useState(0)
const [method, setMethod] = useState('bank')
const [response, setResponse] = useState<PaymentProps>()
const [showEl, setShowEl]=useState(false)
const router= useRouter() 

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


  const handleCheckout = async () => {
//     email
// amount
// job_id
// job_title
// user_id
  fetch('/api/create-order', {
      method: 'POST',
      body: JSON.stringify({ id, amount:product.amount, email:data?.email, job_title:product.title, user_id:data?.id }),
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json()) 
      .then((data) => 
        setResponse(data)
     );
    
return
  }
  
  return(
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
     
     {showEl?
       <div className="p-4 space-y-4 max-w-md mx-auto border rounded-xl shadow">
        <div>  
</div>
    {product.accepted_by&&  <input value={product.accepted_by}disabled placeholder="Your email" className="border p-2 w-full" />}
      <input type="number" value={product.amount} disabled placeholder="Amount" className="border p-2 w-full" />
      <select className="border p-2 w-full">
        <option value="bank">Bank Transfer</option> 
      </select>
      <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded">Checkout</button>
 {response ? (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <p><strong>Order Reference:</strong> {response.reference}</p>
          <p><strong>Amount:</strong> ₦{product.amount}</p>
          <p><strong>Payment Method:</strong> Bank Transfer </p>
           <p><strong>Send To:</strong>GoWork Marketplace, FirstBank Nigeria, Acct: 1234567890</p>
            <p><strong>Use Reference:</strong> {response.reference}</p>
           
        </div>
      ):  (
    <p>Loading...</p>
  )} 
    </div>:  (
    <p>Loading...</p>
  ) }
 
      </div> 

    </div>
  )
 
}

export default JobView
