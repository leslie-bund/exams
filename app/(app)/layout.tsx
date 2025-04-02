import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { checkAuth } from "@/lib/auth/utils";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return ( 
    <main>
      <Navbar />
      <div className="flex gap-4 overflow-hidden">
        <Sidebar />
        <div className="w-full pe-4 pt-6" >{children}</div>
      </div>
    </main>)
}