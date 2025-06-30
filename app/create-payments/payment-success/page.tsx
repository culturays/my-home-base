  
import PrintObject from "@/components/PrintObject";
 ;
const ResultPage=async({
  searchParams,
}: {
  searchParams:  Promise<{ payment_intent: string }>;
}) =>{
  const { payment_intent }=await searchParams
 
  if (!payment_intent) 
    throw new Error("Please provide a valid payment_intent (`pi_...`)"); 
  return (
    <>
      {/* <h2>Status: {paymentIntent.status}</h2>
      <h3>Payment Intent response:</h3>
      <PrintObject content={paymentIntent} />  */}
    </>
  );
}

export default ResultPage