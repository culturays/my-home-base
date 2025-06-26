"use client"
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { handleOauthLogin, signUpAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input, Select } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
 type formVals = {
  fullname?: string;
  email?: string;
  password?: string;
 
};
type formErrors = {
  fullname?: string;
  email?: string; 
  password?: string;
};


const Form = () => {
    const [passType, setPassType] = useState('password');
const [icon, setIcon] = useState(faEyeSlash);
const [errors, setErrors] = useState<formVals>({});

const password_pattern=new RegExp(`^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,20}$`) as any
const email_pattern=new RegExp(`^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$`) as any
const name_pattern=new RegExp(`^[A-Za-z0-9]{3,10}$`)as any
 
const handleToggle = (textPass: string) => {
if (passType===textPass){
  setIcon(faEye);
  setPassType('text') 
} else { 
  setIcon(faEyeSlash) 
  setPassType(textPass)
}
}

const validateForm = (data: {name:string, value:string}) => {
  const errors: formErrors  = {}; 
  if (data.name === 'fullname'&&!name_pattern.test(data.value.trim())) {
      errors.fullname = 'Username is Incorrect';  
  }
  if (data.name === 'email'&&!email_pattern.test(data.value.trim())) {
    errors.email = 'Please Enter a Correct Email';  
}
if (data.name === 'password'&&!password_pattern.test(data.value.trim())) {
  errors.password = 'Password is Incorrect';  
}
 
    return errors;
    };
 
  const handleFocus=(e: React.ChangeEvent<HTMLInputElement>)=>{
  const newErrors = validateForm(e.currentTarget)
  setErrors(newErrors);  
  }
 
  return (
 
   <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email" className="text-lg font-medium text-gray-700">Email</Label>
        <Input name="email" placeholder="you@example.com" 
        pattern={email_pattern}
required={!errors.email }
onBlur={(e) =>handleFocus(e)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-lg"/>
{errors.email &&
<span className="text-red-600">
{errors.email}
</span>
 }
 
 <Label htmlFor="fullname" className="text-lg font-medium text-gray-700">Full Name</Label>
<Input name="fullname" placeholder="Name" pattern={email_pattern}
required={!!errors.fullname }
onBlur={(e) =>handleFocus(e)}  
 className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-lg"/>
 {errors.fullname &&
  <span className='text-red-600'>{errors.fullname}</span>
 }
   <div className="relative"> 
<p className="absolute cursor-pointer right-11 top-12 mt-1.5" onClick={()=>handleToggle("password")}>
<FontAwesomeIcon className="text-gray-600" icon={icon} width={25}/>
</p> 
   </div> 
        <div className="flex justify-between items-center">
          <Label htmlFor="password"  className="text-lg font-medium text-gray-700">Password</Label>
          <Link
            className="text-xs text-foreground underline text-3xl font-bold text-teal-600"
            href="/forgot-password/"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type={passType}
          name="password"
          placeholder="Your password"
        minLength={6}
          pattern={password_pattern}
           required={!!errors.password }
          onBlur={(e) =>handleFocus(e)}   
           className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-lg"
        />
       {errors.password &&
<span className="text-red-600">
{errors.password}
</span>
}
{errors.password&&
<ul className=" m-4">
<li className="list-disc p-1 text-black">At least two uppercase letters.</li>
<li className="list-disc p-1 text-black">At least one special character from the set !@#$&*.</li>
<li className="list-disc p-1 text-black">At least two digits.</li>
<li className="list-disc p-1 text-black">At least three lowercase letters.</li>
<li className="list-disc p-1 text-black">Length between 8 and 20 characters.</li>
</ul>}

       <Label htmlFor="email" className="text-lg font-medium text-gray-700">Role</Label>
           <Select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"name="role">
              <option value="none" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition">None</option>
          <option value="client" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition">Client</option>
          <option value="provider" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition">Service Provider</option>
        </Select>
          <SubmitButton formAction={signUpAction} pendingText="Signing up..."className="bg-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition text-lg">
            Sign up
          </SubmitButton> 
         
      </div>
     
  )
}

export default Form
