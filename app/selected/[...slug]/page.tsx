import { getMyErrands } from "@/app/products/return-products";
import SelectedChores from "@/components/SelectedChores";

const CartPage= async({params}: {
    params: Promise<{ slug: string }>}) =>{
    const {slug} =(await params) 
    const persons_errands =await getMyErrands(slug[1])
   
  return (
 <><SelectedChores persons_errands={persons_errands}/></>
  );
}
export default CartPage 