"use client"
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input, Select } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
          <Input name="email" 
          placeholder="you@example.com"
           pattern={email_pattern}
required={!!errors.email||false}
onBlur={(e) =>handleFocus(e)} 
 className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-lg dark:bg-gray-300 dark:text-gray-700"/>
{errors.email &&
<span className="text-red-600">
{errors.email}
</span>
 }
  <div className="relative"> 
<p className="absolute cursor-pointer right-11 top-12 mt-2" onClick={()=>handleToggle("password")}>
<FontAwesomeIcon className="text-gray-600" icon={icon} width={25}/>
</p> 
   </div>  
  <Label htmlFor="password" className="text-lg font-medium text-gray-700">Password</Label>
          <Input
            type={passType}
            name="password"
            placeholder="Your password"
            minLength={6}
            required={!!errors.password||false}
            onBlur={(e) =>handleFocus(e)} 
             className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-lg dark:bg-gray-300 dark:text-gray-700"
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
    
  {!errors.email ||!errors.password?
         <SubmitButton formAction={signInAction} pendingText="Signing in..."className="bg-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition text-lg">
            Sign in
          </SubmitButton>
:<></>}
 </div>
  
  )
}

export default Form
