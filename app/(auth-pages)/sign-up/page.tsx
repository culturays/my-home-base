
import { FormMessage, Message } from "@/components/form-message";

import Link from "next/link";  
import Form from "./form";
import { handleOauthLogin } from "@/app/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }
 
  return (
    <>
      <form className="flex-1 flex flex-col min-w-64 w-96 p-6 bg-white rounded-xl shadow-md min-w-64 mx-auto border border-gray-100"noValidate>
        <h1 className="text-2xl text-3xl font-bold text-teal-600">Sign up</h1>
 
        <p className="text-foreground font-medium underline">
          Already have an account?{" "}
          <Link className=" font-medium underline text-orange-500 underline hover:text-orange-600" href="/sign-in">
            Sign in
          </Link>
        </p>
       <Form/>
         <small className="text-center text-lg">or </small> 
   <button type="submit" formAction={handleOauthLogin} className="bg-tranparent"><p className="bg-orange-500 text-white font-medium p-2 my-2 rounded-lg hover:bg-orange-600 transition text-lg flex justify-center w-full"><FontAwesomeIcon icon={faGoogle} className="px-2" width={40} />Sign in with Google</p></button>
      <FormMessage message={searchParams} />
      </form> 
    </>
  );
}
