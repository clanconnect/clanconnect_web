"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Mirrors the old SPA behaviour: any unknown route falls back to the home page.
export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null;
}
