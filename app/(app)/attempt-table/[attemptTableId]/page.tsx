import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getAttemptTableById } from "@/lib/api/attemptTable/queries";
import OptimisticAttemptTable from "./OptimisticAttemptTable";
import { checkAuth } from "@/lib/auth/utils";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function AttemptTablePage({
  params,
}: {
  params: { attemptTableId: string };
}) {

  return (
    <main className="overflow-auto">
      <AttemptTable id={params.attemptTableId} />
    </main>
  );
}

const AttemptTable = async ({ id }: { id: string }) => {
  await checkAuth();

  const { attemptTable } = await getAttemptTableById(id);
  

  if (!attemptTable) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="attempt-table" />
        <OptimisticAttemptTable attemptTable={attemptTable}  />
      </div>
    </Suspense>
  );
};
