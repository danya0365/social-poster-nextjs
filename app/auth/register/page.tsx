import { RegisterView } from "@/src/presentation/components/auth/register/RegisterView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "สมัครสมาชิก | " + (process.env.NEXT_PUBLIC_APP_NAME || "Social Poster"),
  description: "สร้างบัญชีใหม่เพื่อจัดการโซเชียลมีเดียของคุณ",
};

/**
 * Register Page - Server Component
 */
export default async function RegisterPage() {
  return <RegisterView />;
}
