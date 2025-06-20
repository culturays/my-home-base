import { NextPage } from 'next';
import { getMyErrands, relatedProduct, returnProduct } from '@/app/products/return-products';
import JobView from '@/components/JobView';
import { createClient } from '@/utils/supabase/server';
import { type User } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
 
type ErrandProps={
  title: string
  desc: string
  images:string[]
  id:number
  }

const ProductPaymentViewPage =async ({params}: {
   params: Promise<{ id: string }>} ) => {
    const id =(await params).id 
        const supabase =await createClient();
        const { 
      data: { user }, 
      } = await supabase.auth.getUser(); 
    const product =await returnProduct(id) 
 
    // const exists = product.find((i:{id:number} ) => i.id === product.id);
  const persons_errands =await getMyErrands(product.listedX.id) 
     const userObj =async()=>{
 const { data: userItem } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()
return userItem
    }

const data = await userObj()
 const related = await relatedProduct(data.address,product.listedX.id)
return (
<div className="">
 {/* Breadcrumbs */}
<nav className="text-sm text-gray-500 mb-8">
  <Link href="/" className="hover:text-black transition">Home</Link>
  <span className="mx-2">&gt;</span>
  <Link href="/dashboard" className="hover:text-black transition">Dashboard</Link>
  <span className="mx-2">&gt;</span>
  <span className="text-black">{product.listedX.title}</span>
</nav>
<section className="grid grid-cols-1 gap-12 mb-16 max-w-xl m-auto">
  {/* Product Image */}
  <div className="rounded-xl overflow-hidden shadow-lg">
    <Image
      src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/files/${product.listedX.images[0]}`}
      alt={product.listedX.title}
    width={700}
    height={350}
      className="rounded-xl"
    />
  </div>

  {/* Product Details */}
  <div className="flex flex-col justify-between">
    <div>
      <h1 className="text-4xl font-bold font-serif mb-4 text-gray-900">{product.listedX.title}</h1>
      <p className="text-2xl text-emerald-700 mb-3">${product.listedX.amount}</p>   
      {!product.listedX.assigned&&<p className="text-gray-600 leading-relaxed ">
     Progress Status: Not Assighed 
      </p> } 
      {product.listedX.assigned&&<p className="text-gray-600 leading-relaxed ">
     Progress Status: Assigned to {product.p.full_name}
      </p> } 
      <p>Job Category</p>
     <ul>
      <li>{product.listedX.category} </li>
       
     </ul>
<p>Contact: </p>
<p className='blur-sm'>{product.listedX.contact}</p>
<p className='blur-sm'>{product.listedX.email}</p> 
<p className="text-gray-600 leading-relaxed ">Start Date: {product.listedX.date}</p>
<p className="text-gray-600 leading-relaxed ">End Date: {product.listedX.deadline}</p>
 
<p className="text-gray-600 leading-relaxed ">Location: {product.listedX.location}</p>
<p className="text-gray-600 leading-relaxed ">Job Status: {product.listedX.status}</p>
<p className="text-gray-600 leading-relaxed ">Payment: {product.listedX.payment_status || 'None'}</p>
  <p className="text-gray-600 leading-relaxed mb-8">
        {product.listedX.description}
      </p> 
    </div> 
  </div> 
</section>

 <JobView product={product.listedX} persons_errands={persons_errands} related={related} id={id} data={data}  /> </div>
    );
};
 
export default ProductPaymentViewPage


