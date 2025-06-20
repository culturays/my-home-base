
import CreatePayments from '@/components/Dashboard/CreatePayments';
import { getPaymentsByClient } from './actions'; 
 
const CreatePaymentPage =async ({ jobId }:{jobId:number}) => {   
  const paymentData=await getPaymentsByClient() 
  return (
<><CreatePayments paymentData={paymentData||[]} /> </>

  )
}

export default CreatePaymentPage
