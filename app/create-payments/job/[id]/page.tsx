import { NextPage } from 'next';
import { getMyErrands, relatedProduct, returnProduct } from '@/app/products/return-products';
import JobView from '@/components/JobView';
import { createClient } from '@/utils/supabase/server';
import { type User } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link'; 
import Invites from '@/components/Invites'; 

const ProductPaymentViewPage =async ({params}: {
params: Promise<{ id: string}>} ) => {
const id =(await params).id 
const supabase =await createClient();
const { 
data: { user }, 
} = await supabase.auth.getUser(); 
const product =await returnProduct(id)

// const exists = product.find((i:{id:number} ) => i.id === product.id);
const user_errands =await getMyErrands(product.listedX.id) 
const userObj =async()=>{
const { data: userItem } = await supabase
.from('profiles')
.select('*')
.eq('id', user?.id)
.single()
return userItem 
}

const data = await userObj()
const related = await relatedProduct(data.address, product.listedX.id)
const checkIvs = async() =>{
const supabase =await createClient();
const { data: vx, error:xy } = await supabase
.from('invitations')
.select('*') 
.eq('job_id', id)

return vx??[]
}
const clientIVT=await checkIvs()
const invitedX = clientIVT?.map((vx)=> vx )

return (
<div className='max-w-max mx-auto'>
 {/* Breadcrumbs */}
<nav className="text-sm mb-8">
  <Link href="/" className="hover:text-black transition">Home</Link>
  <span className="mx-2">&gt;</span>
  <Link href="/dashboard/" className="hover:text-black transition">Dashboard</Link>
  <span className="mx-2">&gt;</span>
  <span className="text-black">{product.listedX.title}</span>
</nav> 
<section className="mb-10 m-auto">
  {/* Product Image */}
  <Invites product={product.p} invitedX={invitedX} job={product.listedX} />
  <div className='max-w-lg'>
 <div className="rounded-xl overflow-hidden shadow-lg">
  { product.listedX.images?.length>0&& <Image
      src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/files/${product.listedX.images[0]}`}
      alt={product.listedX.title}
    width={700}
    height={350}
      className="rounded-xl"
    />}
     {product.listedX.images?.length===0&& <Image
      src='/popcorn.png'
      alt={product.listedX.title}
    width={700}
    height={350}
      className="rounded-xl"
    />}
  </div> 

  {/* Product Details */}
  <div className='my-6'>
      <h1 className="text-4xl font-bold font-serif mb-4">{product.listedX.title}</h1>
      <p className="text-2xl text-emerald-700 mb-3">${product.listedX.amount}</p>   
      {!product.listedX.assigned&&<p className="leading-relaxed">
     Progress Status: Not Assighed 
      </p> }  
      <p>Job Category</p>
     <ul>
      <li>{product.listedX.category} </li>
       
     </ul>
     <div className='flex'>
<p>Contact: </p>
<ul className='mx-2'>
<li className='blur-sm'>{product.listedX.contact}</li>
<li className='blur-sm'>{product.listedX.email}</li>
</ul>
 </div>
<p className="leading-relaxed ">Start Date: {new Date(product.listedX.date).toDateString()}</p>
<p className="leading-relaxed ">End Date: {new Date(product.listedX.deadline).toDateString()}</p> 
<p className="leading-relaxed ">Location: {product.listedX.location}</p>
<p className="leading-relaxed ">Job Status: {product.listedX.status}</p>
<p className="leading-relaxed ">Payment: {product.listedX.payment_status || 'None'}</p>
  <p className="leading-relaxed mb-8">
        {product.listedX.description}
      </p> 
    </div> 
  </div> 

</section>
 <JobView product={product.listedX} id={id} data={data} /> 
  <main className="max-w-6xl mx-auto py-10"> 
       <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-serif mb-6">Your Pending Payments</h1>
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
  <section className='my-11'>
        <h2 className="text-2xl font-serif mb-6">Related Chores</h2>
          <div className="flex flex-col lg:flex-row gap-4">
            {related.map((item)=> (
            <div key={item?.title} className="border p-4 rounded text-center m-auto"> 
              <div className="w-full mb-3">
                <Image src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/files/${item.images[0]}`} className="h-[220px] sm:h-[200px]" alt={item.title} width={350} height={40}/>
              </div>
              <Link href={`/create-payments/job/${item.slug}`}><p className="font-medium">{item.title}</p></Link>
              <p className="text-gray-500 dark:text-gray-300">{item.description}</p>
              <p className="text-gray-500 dark:text-gray-300">{item.location}</p>
            </div>
          ))}  
        </div>  
      </section>
 
  </div>
    );
};
 
export default ProductPaymentViewPage


