"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function ProtectedClient({ children, role }) {
  const { user } = useAuth();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (user === null) return; // still loading
    if (!user) {
      router.push("/sign-in");
      return;
    }
    if (role && user.role !== role) {
      router.push(user.role === "admin" ? "/admin" : "/dashboard");
      return;
    }
    setReady(true);
  }, [user]);

  if (!ready) return <div className="p-8">Checking permissions...</div>;
  return <>{children}</>;
}
