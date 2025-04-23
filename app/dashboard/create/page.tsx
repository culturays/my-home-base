import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { type User } from '@supabase/supabase-js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import ImageInput from '@/components/ImageInput';
type DataProps={
  name: string, 
    desc: string,
   
}
const userObj =async()=>{
    const supabase =await createClient();
    const { 
      data: { user }, 
      } = await supabase.auth.getUser();
  
      return user as User
  }
export default function CreateProduct() { 
  const handleSubmit = async (formData: FormData) => {
    "use server"
    const supabase=await createClient()
    const user = await userObj();
    const title= formData.get('title') as string
    const desc= formData.get('desc') as string
    const loc= formData.get('loc') as string
    const contact= formData.get('contact') as string
    const files = formData.getAll("files");
    const allFiles=[]
    for (let i = 0; i < files.length; i++) {
        const file =files[i]as File ;
      
        if (file) {
          const filePath = `${Date.now()}-${file.name}`;        
          if (file.name && !file.name.includes('undefined')) {
            allFiles.push(filePath.replace(/ /g, "-").trim());
            const { error: uploadError } = await supabase.storage
              .from('files')
              .upload(filePath.replace(/ /g, "-").trim(), file, { upsert: true });
      
            if (uploadError) {
              throw new Error('An error has occurred');
            }
          }  
      
        }
       
        };
    const data = {
      title ,
      desc,
     user_id:user.id,
     email:user.email,
images:allFiles,
slug:title.replace(/ /g,"-").trim().toLowerCase(),
related:[loc],
loc ,
contact 
    }; 
    const { data:prods, error } = await supabase
    .from('listed-e')
    .insert(data)
    .select()
    if (error) console.error(error.message);
   redirect('/dashboard');
  };

  return (
    <form action={handleSubmit} className="p-4 space-y-4">
     <label>Chore Type</label>
     <input name="title" placeholder="Chore Type" className="input" /> 
     <input name="contact" placeholder="Contact" type='number' className="input" /> 
     <input name="loc" placeholder="Location" type='text' className="input" /> 
  <textarea name="desc" placeholder="desc" className="input" rows={4}
cols={50}
maxLength={100}/> 
  <label className="m-5 block text-2xl text-white" htmlFor="file_input">
   <div className="flex relative w-max cursor-pointer"> 
      <input
    className="block top-0 -left-5 z-20 opacity-0 absolute p-2 text-text font-bold border border-gray-300 rounded-lg focus:outline-none dark:placeholder-gray-400 w-10 h-10"
    id=""
    type="file"
    name='files'
    multiple 
    accept="image/*,video/*"
    //  onChange={handleImageUpload}
    /> 
    </div> <p className="cursor-pointer"> 
    <FontAwesomeIcon 
      icon={faImage}
      width={30}
      />
      </p>
    </label>
<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
    </form>
  );
}
