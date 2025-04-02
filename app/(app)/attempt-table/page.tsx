import { Suspense } from "react";

import Loading from "@/app/loading";
import AttemptTableList from "@/components/attemptTable/AttemptTableList";
import { getAttemptTables as getAttemptTable } from "@/lib/api/attemptTable/queries";

import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function AttemptTablePage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Attempt Table</h1>
        </div>
        <AttemptTable />
      </div>
    </main>
  );
}

const AttemptTable = async () => {
  await checkAuth();

  const { attemptTable } = await getAttemptTable();
  
  return (
    <Suspense fallback={<Loading />}>
      <AttemptTableList attemptTable={attemptTable}  />
    </Suspense>
  );
};
