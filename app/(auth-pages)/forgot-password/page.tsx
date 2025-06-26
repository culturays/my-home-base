import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
    <form className="flex-1 flex flex-col gap-2 text-gray-800 bg-white p-6 rounded-xl shadow-md min-w-64 max-w-96 w-[600px] mx-auto border border-gray-100">
  <div>
    <h1 className="text-3xl font-bold text-teal-600">Reset Password</h1>
    <p className="text-lg text-gray-600 mt-1">
      Already have an account?{" "}
      <Link className="text-orange-500 underline hover:text-orange-600" href="/sign-in">
        Sign in
      </Link>
    </p>
  </div>

  <div className="flex flex-col gap-2 mt-8">
    <Label htmlFor="email" className="text-lg font-medium text-gray-700">Email</Label>
    <Input
      name="email"
      type="email"
      placeholder="you@example.com"
      required
      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
    />
    <SubmitButton
      formAction={forgotPasswordAction}
      className="bg-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition text-lg"
    >
      Reset Password
    </SubmitButton>
    <FormMessage message={searchParams} />
  </div>
</form>

     
    </>
  );
}
