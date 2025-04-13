import UserSettings from "@/app/(app)/account/UserSettings";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";

export default async function Profile() {
  await checkAuth();
  const { session } = await getUserAuth();

  return (
    <div className="space-y-4">
      <UserSettings session={session} />
    </div>
  );
}
