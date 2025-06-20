"use server"

import { createClient } from "@/utils/supabase/server";

 export const handleAccept = async (id:number|string) => {
     const supabase =await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser() 
    const { error } = await supabase
      .from("jobs")
      .update({ status: "accepted", accepted_by: user?.id })
      .eq("id", id);

    if (error) {
      alert("Error accepting errand");
      return;
    }
return { status: "accepted", accepted_by: user?.id }
    // setErrands((prev) =>
    //   prev.map((e) => (e.id === id ? { ...e, status: "accepted" } : e))
    // );
    ///alert("Errand accepted!");
  };