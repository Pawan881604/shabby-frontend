"use client";
import { useUser } from "hooks/use-user";
import { Loadin_section } from "lib/Loadin_section";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { isLoading, user } = useUser();

  useEffect(() => {
    console.log("isLoading:", isLoading);
    console.log("user:", user);
    
    if (isLoading && user && user.role === "admin") {
      redirect("/dashboard");
    }
    
    redirect("/nothing")
  }, [isLoading, user]);

  if (isLoading) {
    return <Loadin_section height={true}/>; // Show loading state while loading
  }

  return <p>Redirecting...</p>; // Optional: Display something while redirecting
}
