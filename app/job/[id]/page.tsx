import { getMyErrands, relatedProduct, returnProduct } from '@/app/products/return-products';
import JobView from '@/components/JobView';
import ErrandView from '@/components/JobView';
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
  
const ProductDetailPage =async ({params }: {
   params: Promise<{ id: string }>} ) => {
    const id =(await params).id 
    const supabase=await createClient() 
    const product =await returnProduct(id)
    const related = await relatedProduct(product.listedX.location, product.listedX.id)
       const { 
      data: { user }, 
      } = await supabase.auth.getUser(); 
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
    return (
        <div className="w-[1200px]">
      {/* Breadcrumbs */}
<nav className="text-sm text-gray-500 mb-8">
  <Link href="/" className="hover:text-black transition">Home</Link>
  <span className="mx-2">&gt;</span>
  <Link href="/dashboard" className="hover:text-black transition">Dashboard</Link>
  <span className="mx-2">&gt;</span>
  <span className="text-black">{product.listedX.title}</span>
</nav>

{/* Product Info */}
<section className="w-[500px] m-auto">
  {/* Product Image  */}
  <div className="w-full h-96 relative rounded-xl overflow-hidden shadow-lg">
    
       {product.listedX.images?.length>0&& <Image
      src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/files/${product.listedX.images[0]}`}
      alt={product.listedX.title}
      layout="fill"
      objectFit="cover"
      className="rounded-xl"
    />}
   
      {product.listedX.images?.length<1&& <Image
      src='/popcorn.png'
      alt={product.listedX.title}
      layout="fill"
      objectFit="cover"
      className="rounded-xl"
    />}
  </div>

  {/* Product Details */}
  <div className="flex flex-col justify-between">
    <div>
      <h1 className="text-4xl font-bold font-serif mb-4 text-gray-900">{product.listedX.title}</h1>
     Cost: <p className="text-2xl text-emerald-700 mb-3">${product.listedX.amount}</p>
   
      <p className="text-gray-600 leading-relaxed ">
       Assigned: { product.p.assigned || 'None'} 
      </p>  
       {/* <p className="text-gray-600 leading-relaxed ">
        {product.contact} 
      </p> */}      
        Description: <p className="text-gray-600 leading-relaxed mb-8">
        {product.listedX.description}
      </p>
    </div> 
  </div>
</section> 
{/* <JobView product={product} persons_errands={persons_errands} related={related} id={id} data={data} /> */}
  </div>
    );
};

export default ProductDetailPage;