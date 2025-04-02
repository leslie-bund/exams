import { Suspense } from "react";

import Loading from "@/app/loading";
import ScoreList from "@/components/score/ScoreList";
import { getScore } from "@/lib/api/score/queries";

import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function ScorePage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Score</h1>
        </div>
        <Score />
      </div>
    </main>
  );
}

const Score = async () => {
  await checkAuth();

  const { score } = await getScore();
  
  return (
    <Suspense fallback={<Loading />}>
      <ScoreList score={score}  />
    </Suspense>
  );
};
