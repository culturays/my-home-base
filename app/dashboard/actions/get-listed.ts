import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function getData() {
 const supabase = await createClient()
 const user = await supabase.auth.getUser();
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
//   }

  const { data: listedData, error } = await supabase
  .from('listed-e')
  .select('*')
 
  //const products = await Product.find({ vendorId: session.user.email });
  return NextResponse.json( listedData );
}
