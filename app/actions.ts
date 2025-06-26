"use server";
import  * as webpush from 'web-push'
import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation"; 
export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const full_name = formData.get("fullname")?.toString();
   const role = formData.get("role")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
 
  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }
  
  const { error } = await supabase.auth.signUp({
    email,
    password, 
    options: {         
        data: { full_name, role } ,    
        emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

 encodedRedirect("success", "/protected/reset-password", "Password updated");

};

export const signOutAction = async () => {
  const supabase = await createClient();
        const {
    data: { user },
  } = await supabase.auth.getUser();  
  const {error} = await supabase.from('roles').update({ active:false }).eq('user_id', user?.id)
    await supabase.auth.signOut();
  return redirect("/sign-in/");
};

export const handleOauthLogin = async () => { 
  const origin = (await headers()).get("origin"); 
  const supabase =await createClient(); 
  const referer = (await headers()).get("referer"); 
 
  const redirectTo = origin
  ? `${origin}/auth/callback?redirect_to=${encodeURIComponent('/')}`
  : `${origin}/auth/callback`; 
  
    const { data, error } = await supabase.auth.signInWithOAuth({
   provider: 'google',  
   options: { 
   redirectTo:`${origin}/auth/callback` ,
  }, 
    })
  
   if (error instanceof Error) {
      console.error(error); 
     //return error.message       
  }
  
  return redirect(data.url as string);
 };
 
 export const deleteUser = async (userId:number | string) => {
  const supabase = await createClient();
   const { error } = await supabase.auth.admin.deleteUser(userId as string);
  return redirect("/");
};
webpush.setVapidDetails(
  'mailto:your-email@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)
 
let subscription: PushSubscription | null = null;
 function arrayBufferToBase64(buffer: ArrayBuffer | null): string {
  if (!buffer) return '';
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach(b => binary += String.fromCharCode(b));
  return btoa(binary);
}
export async function subscribeUser(sub: PushSubscription ) {
  subscription = sub;
   const p256dh = arrayBufferToBase64(sub.getKey('p256dh'));
  const auth = arrayBufferToBase64(sub.getKey('auth'));
  const supabase = await createClient()
 const { data, error } = await supabase
    .from('subscriptions')
    .insert({
      endpoint: sub.endpoint,
      expirationTime: sub.expirationTime,
      keys: {
        p256dh ,
        auth 
      }
    })
    .select();
  return { success: true }
}
 
export async function unsubscribeUser(user_id: number) {
  subscription = null
    const supabase = await createClient()
const { error } = await supabase
  .from('subscriptions')
  .delete()
  .eq('user_id', user_id)

  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true }
}
 
export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error('No subscription available')
  }
 
  try {
    // await webpush.sendNotification(
    //   subscription,
    //   JSON.stringify({
    //     title: 'Test Notification',
    //     body: message,
    //     icon: '/icon.png',
    //   })
    // )
    return { success: true }
  } catch (error) {
    console.error('Error sending push notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}