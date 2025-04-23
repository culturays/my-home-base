import { getMyErrands, relatedProduct, returnProduct } from '@/app/products/return-products';
import ErrandView from '@/components/ErrandView';
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
// Dummy product data for demonstration
// const product = {
//     id: '1',
//     name: 'Luxury Photography Service',
//     images: [
//         '/product-photography-1.jpg',
//         '/product-photography-2.jpg',
//         '/product-photography-3.jpg',
//         '/product-photography-4.jpg',
//     ],
//     price: 2500,
//     description: 'Capture your most precious moments with our exclusive luxury photography service.  We specialize in creating timeless, artistic images that you will cherish for a lifetime.  Our experienced photographers use state-of-the-art equipment and techniques to ensure the highest quality results.',
//     options: [
//         { name: 'Session Length', values: ['2 Hours', '4 Hours', '6 Hours'] },
//         { name: 'Location', values: ['Studio', 'On-Location', 'Destination'] },
//         { name: 'Package', values: ['Basic', 'Premium', 'Platinum'] },
//     ],
//     colors: [
//         { name: 'Elegant Black', value: '#000000', image: '/swatch-black.png' },
//         { name: 'Pristine White', value: '#FFFFFF', image: '/swatch-white.png' },
//         { name: 'Golden Hour', value: '#F59E0B', image: '/swatch-gold.png' },
//     ],
//     relatedProducts: [
//         { id: '2', name: 'Luxury Videography Service', price: 3000, image: '/related-videography.jpg' },
//         { id: '3', name: 'Premium Photo Album', price: 500, image: '/related-album.jpg' },
//         { id: '4', name: 'Professional Photo Editing', price: 1000, image: '/related-editing.jpg' },
//     ],
// };

const ProductDetailPage =async ({params}: {
   params: Promise<{ slug: string }>} ) => {
    const slug =(await params).slug 
    const supabase=await createClient()
    const data = await supabase.auth.getUser();
    const product =await returnProduct(slug)
    const related = await relatedProduct(product.loc, product.id)
    const user = data.data.user 
    // const exists = product.find((i:{id:number} ) => i.id === product.id);
  const persons_errands =await getMyErrands(user?.id as string)
   
     const addMyErrands=async() =>{ 
        "use server"       
        const supabase=await createClient()
        const { data, error }= await supabase
        .from('selectedEs')
       .insert(product)  
       .single()
       if(error)console.error(error)
        console.log(data)
      
      }

     
    return (
        <div className="bg-gray-100 min-h-screen">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6 text-gray-500">
        <Link href='/'><span>Home</span></Link> &gt;  <Link href='/dashboard'><span>Dashbord</span></Link> &gt; <span className="text-black">{product.title}</span>
      </nav>
  {/* Product Info */}
  <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div className="w-full h-96 relative">
         <Image src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/files/${product.images[0]}`} alt="Camera" layout="fill" objectFit="contain"  /> 
        </div>
        <div>
          <h2 className="text-4xl font-serif mb-4">{product.title}</h2>
          <p className="text-2xl text-gray-700 mb-2">$2,999.00</p>
          <p className="text-gray-600 mb-6">{product.desc} Party dishes, table clothes and personal clothe allowed in this service.</p> 
          <form action={addMyErrands}>
          <button className="bg-black text-white px-6 py-3 rounded hover:opacity-90 transition" type='submit' >Select Chore</button> </form> 
        </div>
      </section>
    
        <ErrandView product={product} persons_errands={persons_errands} related={related} /> 
        </div>
    );
};

export default ProductDetailPage;