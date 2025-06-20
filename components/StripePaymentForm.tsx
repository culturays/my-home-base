"use client"
import { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';  

  const PaymentStatus = ({ status, errorMessage }: { status: string, errorMessage: string }) => { 
    switch (status) {
      case "processing":
      case "requires_payment_method":
      case "requires_confirmation":
        return <h2>Processing...</h2>;

      case "requires_action":
        return <h2>Authenticating...</h2>;

      case "succeeded":
        return <h2>Payment Succeeded 🥳</h2>;

      case "error":
        return (
          <>
            <h2>Error 😭</h2>
            <p className="error-message">{errorMessage}</p>
          </>
        );

      default:
        return null;
    }
  };
export default function StripePaymentForm({  jobId }: {jobId: string|number}) {
 const stripe = useStripe();
  const elements = useElements(); 
  const [processing, setProcessing] = useState(false); 

  // const [payment, setPayment] =  useState<{
  //   status: "initial" | "processing" | "error";
  // }>({ status: "initial" });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    if (!stripe || !elements) return;
    if (!e.currentTarget.reportValidity()) return;  
  
   setProcessing(true);
 
    const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: { 
    return_url: `${window.location.origin}/dashboard`,
   payment_method_data: {
   billing_details: {
 
    },
    },
      },     
 
    });

   if (error) { 
       setErrorMessage(error.message ?? "An unknown error occurred");       
    } 
   
 setProcessing(false);

  };


//4242 4242 4242 4242
  return ( 
  <>  
  <form onSubmit={handleSubmit}>  
    <PaymentElement />           
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      <button type="submit" disabled={processing} className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
        {processing ? 'Processing…' : 'Pay Now'}
      </button> 
      </form>
      
    {/* <PaymentStatus status={payment.status} errorMessage={errorMessage} /> */}
   </>
  );
}
