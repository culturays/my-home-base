 
import Link from 'next/link'; 
import { createClient } from '@/utils/supabase/server';
import { returnProducts } from '../products/return-products';
import Image from 'next/image';

const DashboardPage = async()=> {
  const handleDelete = async (id: string) => {
    const supabase=await createClient()
    const { error } = await supabase
    .from('listed-e')
    .delete()
    .eq('id', id)    
    
   // await axios.delete(`/api/products/${id}`);
    //setProducts(products.filter((p: any) => p._id !== id));
    //onClick={() => handleDelete(p._id)} 
  };
 const products =await returnProducts()

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">My Products</h1>
        <Link href="/dashboard/create" className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add Product
        </Link>
      </div>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="p-2">Name</th>
            <th>Desc</th>
            <th >Photo</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p: any) => (
           <tr key={p.id} className="border-t">
                <td className="p-2">{p.title}</td>
              <td> {p.desc}</td>            
             <td><Image src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/files/${p.images[0]}`} width={80} height={80} alt={p.title}/> 
              </td>
              <td><Link href={`/errand/${p.slug}`}>View</Link> </td>
              <td className="text-right space-x-2"><Link href={`/dashboard/edit/${p.id}`} className="text-blue-500">Edit</Link>
                <button className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default DashboardPage