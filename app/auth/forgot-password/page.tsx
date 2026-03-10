import { ForgotPasswordView } from "@/src/presentation/components/auth/forgot-password/ForgotPasswordView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ลืมรหัสผ่าน | " + (process.env.NEXT_PUBLIC_APP_NAME || "Social Poster"),
  description: "ขอรีเซ็ตรหัสผ่านสำหรับบัญชี Social Poster ของคุณ",
};

/**
 * Forgot Password Page - Server Component
 */
export default async function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
