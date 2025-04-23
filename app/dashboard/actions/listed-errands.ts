'use server'
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function SearchErrandsPage(query:string) {
 const supabase = await createClient() 
const { data, error } = await supabase
.from('listed-e')
.select('*')
.eq('title', [query])
if (error) console.error(error.message);
return data??[]; 
 
}
 