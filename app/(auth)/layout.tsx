import { getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserAuth();
  if (session?.session) {
    const user = session.session.user;
    if (user) {
      redirect("/dashboard");
    }
  }

  return <div className="bg-muted h-screen pt-8">{children}</div>;
}
