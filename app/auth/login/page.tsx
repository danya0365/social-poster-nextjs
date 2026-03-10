import { LoginView } from "@/src/presentation/components/auth/login/LoginView";
import { createServerLoginPresenter } from "@/src/presentation/presenters/auth/login/LoginPresenterServerFactory";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบ | " + (process.env.NEXT_PUBLIC_APP_NAME || "Social Poster"),
  description: "เข้าสู่ระบบเพื่อจัดการโพสต์โซเชียลของคุณ",
};

/**
 * Login Page - Server Component
 * Uses presenter pattern following Clean Architecture
 */
export default async function LoginPage() {
  const presenter = createServerLoginPresenter();

  try {
    const viewModel = await presenter.getViewModel();
    return <LoginView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching login data:", error);
    return <LoginView />;
  }
}
