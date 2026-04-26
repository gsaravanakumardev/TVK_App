"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Login from "@/components/pages/Login";

export default function RootPage() {
  const { user } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (!user) {
    return <Login />;
  }

  return null;
}
