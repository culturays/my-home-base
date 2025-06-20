
import CreatePayments from '@/components/Dashboard/CreatePayments';
import { getPaymentsByClient } from './actions'; 
 
const CreatePaymentPage =async () => {   
  const paymentData=await getPaymentsByClient() 
  return (
<><CreatePayments paymentData={paymentData||[]} /> </>

  )
}

export default CreatePaymentPage
