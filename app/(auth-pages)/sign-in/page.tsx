import { handleOauthLogin } from "@/app/actions";
import { Message } from "@/components/form-message";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";  
import Form from "./form"; 
 
export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams; 

  return (
    <form className="flex-1 flex flex-col min-w-64 w-96 p-6 bg-white rounded-xl shadow-md min-w-64 mx-auto border border-gray-100" noValidate >
      <h1 className="text-2xl text-3xl font-bold text-teal-600">Sign in</h1> 
      <p className="text-sm text-foreground font-medium underline text-gray-700">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline text-orange-500 underline hover:text-orange-600" href="/sign-up">
          Sign up
        </Link>
      </p>
    <Form/>
         <small className="text-center text-lg">or </small> 
         <button type="submit" formAction={handleOauthLogin} className="bg-tranparent"><p className="bg-orange-500 text-white font-medium p-2 my-2 rounded-lg hover:bg-orange-600 transition text-lg flex justify-center w-full"><FontAwesomeIcon icon={faGoogle} className="px-2" width={40} />Sign in with Google</p></button>
    </form>
  );
}
 