"use client"
import { handleSubmit } from "@/app/dashboard/actions/create";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type User } from "@supabase/supabase-js";
import { useActionState, useEffect, useState } from "react";  
import { Select } from "../ui/input";
import { handleEdit } from "@/app/dashboard/actions/edit-job";
import { ErrandProps } from "@/app/types";
import Image from "next/image";
import locations from '@/data/locations.json';
 function toDatetimeLocal(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const Create = ({message, user, id, jobEdit}:{message:string, user:User, id: string, jobEdit:ErrandProps}) => {
 const initialState = { message: '', errors:''};
async function handleFormAction(prevState: any, formData: FormData) { 

  if (!id) { 
    return await handleSubmit(prevState, formData);
  } else { 
    return await handleEdit(prevState, formData, id);
  }
}

 const [state, formAction , pending] = useActionState(handleFormAction, initialState)  
   const [inputValue, setFormValue] = useState({
    title:'',
    contact:0,
    location:'',
    file:'',
    price:0, 
    date:'',
    deadline:'',
   errandType:'',
   description:'',
   amount:'',
    state:'',
   });

  // Load saved value on mount
 useEffect(() => {
    const savedData = localStorage.getItem('myForm');
    if (savedData) {
      setFormValue(JSON.parse(savedData));
    }else{
localStorage.setItem('myForm', '');
}
  }, []); 

  // Save value on change
  useEffect(() => {
   localStorage.setItem('myForm', JSON.stringify(inputValue));
  }, [inputValue]);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setFormValue((prevData) => ({
      ...prevData,
      [name]: value
    })); 
  
  };
 
  return (
<div className="max-w-2xl mx-auto">
<h2 className="text-3xl text-gray-200 rounded font-bold bg-black p-6 w-max">{id?'Edit Request':'Create Request'}</h2>
<form action={formAction} className="p-4 space-y-4 dark:border">

<div className="text-lg py-2"> 
<label>Title</label>
<input name="title" placeholder="Braid Hair, Usher, Wash Car" className="input focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 py-2 dark:bg-gray-50 dark:text-gray-700" 
value={inputValue.title||jobEdit?.title||''}
onChange={handleChange}/>
</div>
<div className="text-lg py-2">
<label htmlFor="message">Contact</label>
<input name="contact" placeholder="Contact" type='number' className="input focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 py-2 dark:bg-gray-50 dark:text-gray-700"
value={inputValue.contact||jobEdit?.contact||''}
onChange={handleChange}
/>
</div>

<div className="text-lg py-2 sm:flex gap-2 justify-center space-y-2">
  <div className="max-w-xs m-auto"> 
<label htmlFor="location">Errand Location</label>
<input name="location" placeholder="Location" type='text' className="input focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 py-2 dark:bg-gray-50 dark:text-gray-700 w-72 block"
value={inputValue.location||jobEdit?.location||''}
onChange={handleChange} /></div>
<div className="max-w-xs m-auto"> 
<label htmlFor="location">State</label>
 <select className="input focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 py-2 dark:bg-gray-50 dark:text-gray-700 w-72 block"
           value={inputValue.state||''}
           name='state'
            onChange={handleChange} > 
             <option className="font-bold"> — Cape Verde</option>
             {locations.capeVerde.map(loc => (
                     <option key={loc.island} value={loc.island}>{loc.island}</option>
                     ))} 
                     <option className="font-bold"> — Nigeria</option>
                      {locations.nigeria.map(loc => (
                     <option key={loc.state} value={loc.state}>{loc.state} — {loc.capital}</option>
                     ))}  
  </select>
  </div>
</div>

<div className="text-lg py-2">
<label htmlFor="errand_type">Errand Type</label>     
<Select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition dark:bg-gray-50 dark:text-gray-700" name="errandType"  
value={inputValue.errandType||jobEdit?.errandType||''}             
onChange={handleChange}
>

<option className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition">All </option>

<option className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition">Outdoors - Maruwa Water etc </option>
<option className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition">Indoors - Cleaning, Dishes, Laundry</option>
<option className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition">Work Place - Airbnb, Store, Sort Goods at Warehouse </option>
<option className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition">Others</option>
</Select>  </div>
<div className="sm:flex justify-center gap-1">
<div className="text-lg py-2 ">
<label htmlFor="date" className="block mb-1 ">
Date
</label>

<input
type="datetime-local"
id="date"
name="date" 
className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
value={inputValue.date || toDatetimeLocal(new Date(jobEdit?.date))||''}
onChange={handleChange}
/>
</div>
<div className="text-lg py-2">
<label htmlFor="deadline" className="block mb-1">
Deadline
</label>
 
<input
type="datetime-local"
id="deadline"
name="deadline" 
className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
value={inputValue.deadline || toDatetimeLocal(new Date(jobEdit?.deadline))||''}
onChange={handleChange}
/></div>
</div>

<div className="text-lg py-2">
<label className="text-lg py-2 " htmlFor="message">Message</label>
<textarea name="description" placeholder="Describe your chore. Is transportation including and what shold be expected in the location? Are there dogs are certain dress codes required?" className="input focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-50 dark:text-gray-700" rows={4}
cols={50}
maxLength={100}
value={inputValue.description||jobEdit?.description||''}
onChange={handleChange}
/></div>

<div className="text-lg py-2" >
<label className="text-lg py-2 " htmlFor="Price">Price</label>
<input name="amount" placeholder="Job Price" type='text' className={message==='please enter an amount'? "input focus:outline-none ring-2 ring-red-500 border-red-500":'input focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-50 dark:text-gray-700' } value={inputValue.amount||jobEdit?.amount||''}
onChange={handleChange}/> 
</div>

<label className="my-5 block text-2xl bg-black text-white w-max" htmlFor="file_input">
<div className="flex relative w-max cursor-pointer"> 
<input
className="block top-0 -left-5 z-20 opacity-0 absolute p-2 font-bold border border-gray-300 rounded-lg focus:outline-none dark:placeholder-gray-400 w-10 h-10"
id=""
type="file"
name='files'
multiple 
accept="image/*,video/*"
//  onChange={handleImageUpload}
onChange={handleChange}
/> 

{jobEdit?.images?.length > 0 && (
  <div className="flex gap-2 my-2">
    {jobEdit?.images.map((img, i) => (
      <Image key={i} src={`https://cgdonystqsigvcjbdxvk.supabase.co/storage/v1/object/public/files/${img}`} className="w-16 h-16 object-cover rounded" alt="preview" width={20}
      height={20}/>
    ))}
  </div>
)}
</div> <p className="cursor-pointer"> 
<FontAwesomeIcon 
icon={faImage}
width={30}
/>
</p>
</label>
{state?.message?<p className="py-2 text-red-600 rounded capitalize">{state?.message}</p>:''}
<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{id?'Edit':'Create'}</button>

{state?.errors && <p className="text-red-500 text-sm">{state?.errors}</p>}
</form>
</div>
)
}

export default Create
