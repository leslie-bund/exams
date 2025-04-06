import { SidebarNav } from "@/components/UserSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import "@/app/globals.css";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { ModeToggle } from "@/components/DarkModeToggle";
export default async function UserAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await getUserAuth();
  await checkAuth();
  return (
    <main>
      <SidebarProvider defaultOpen={true}>
        {session?.user && (
          <SidebarNav
            user={{
              name: session.user.name as string,
              email: session.user.email as string,
              image: session.user.image as string,
            }}
          />
        )}
        <SidebarInset>
          {/* Add header with SidebarTrigger */}
          <header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="text-lg font-semibold">Leslie Hub</h1>
              </div>
            </div>

            <ModeToggle />
          </header>
          <main className="relative flex-1 p-4 md:p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
