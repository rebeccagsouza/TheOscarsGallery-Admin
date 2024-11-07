"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@context/AuthContext"; 

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return null; // Não exibe nada diretamente na Home
}
