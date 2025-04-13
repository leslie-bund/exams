import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getScoreById } from "@/lib/api/score/queries";
import OptimisticScore from "./OptimisticScore";
import { checkAuth } from "@/lib/auth/utils";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function ScorePage({
  params,
}: {
  params: Promise<{ scoreId: string }>;
}) {

  return (
    <main className="overflow-auto">
      <Score id={(await params).scoreId} />
    </main>
  );
}

const Score = async ({ id }: { id: string }) => {
  await checkAuth();

  const { score } = await getScoreById(id);
  

  if (!score) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="score" />
        <OptimisticScore score={score}  />
      </div>
    </Suspense>
  );
};
