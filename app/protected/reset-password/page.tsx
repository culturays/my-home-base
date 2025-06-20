import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 
import Link from "next/link"; 

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams; 
 
  return (
    <form className="max-w-md p-4 gap-2 [&>input]:mb-4 flex-1 flex flex-col w-full gap-2 text-gray-800 bg-white p-6 rounded-xl shadow-md min-w-64 max-w-96 mx-auto border border-gray-100">
      <h1 className="text-2xl font-medium font-bold text-teal-600">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
       <div className="flex flex-col gap-2 mt-8">
      <Label htmlFor="password" className="text-lg font-medium text-lg text-gray-600 mt-1">New password</Label>
      <Input
        type="password"
        name="password"
        placeholder="New password"
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
        required
      />
      <Label htmlFor="confirmPassword"className="text-lg font-medium text-gray-700">Confirm password</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
        required
      />
      <SubmitButton formAction={resetPasswordAction} className="bg-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition text-lg">
        Reset password
      </SubmitButton>      
      <FormMessage message={searchParams} />
      <Link href='/dashboard' className="text-foreground border-l-2 border-foreground px-4 text-sm hover:text-orange-600">Return Home</Link></div>
   
    </form>
  );
}
