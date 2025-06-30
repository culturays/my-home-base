 "use client"
 
import { PaymentProps } from "@/app/types";
import { useEffect, useState } from "react"; 
 
const CreatePayments = ({paymentData}:{paymentData:PaymentProps[]}) => {
const [clientSecret, setClientSecret] = useState('');
// const [jobId, setJobId] = useState(0);
//   useEffect(() => {
//     fetch(`/api/create-payment-intent`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ jobId }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret)) 
  
//  }, [jobId]);
 
//     const appearance = { theme: ' ' as "flat" | " " | "night" | undefined};
const pendingPays = paymentData.filter((xy)=> xy.status==='pending')
  return  (
    <div >
         <h2 className="text-xl font-semibold mb-4">Pending Payments</h2>
   <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-200 rounded-md shadow-sm">
        <thead className="bg-gray-100 text-sm text-gray-600">
          <tr>
            <th className="px-4 py-2 text-left">Job ID</th>
            <th className="px-4 py-2 text-left">Amount ($)</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {pendingPays.map((payment) => (
            <tr key={payment.id} className="border-t text-sm">
              <td className="px-4 py-2">{payment.job_id}</td>
              <td className="px-4 py-2">{payment.amount.toFixed(2)}</td>
              <td className="px-4 py-2 capitalize text-yellow-600">{payment.status}</td>
              <td className="px-4 py-2 text-gray-500">
                {new Date(payment.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
          <tbody>
          {paymentData.map((payment) => (
            <tr key={payment.id} className="border-t text-sm">
              <td className="px-4 py-2">{payment.job_id}</td>
              <td className="px-4 py-2">{payment.amount.toFixed(2)}</td>
              <td className="px-4 py-2 capitalize text-yellow-600">{payment.status}</td>
              <td className="px-4 py-2 text-gray-500">
                {new Date(payment.created_at).toLocaleDateString()}
              </td>
              {payment.status === 'pending' && (
 <td><a
    href={`/payment/${payment.id}`}
    className="inline-block bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 m-4"
  >
    Pay Now
  </a></td>
)}
  </tr>
          ))}
        </tbody>
      </table>
    </div> 
 
    </div>
  ) 
}

export default CreatePayments
