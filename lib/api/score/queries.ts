import { db } from "@/lib/db/index";
import { eq, and, desc } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ScoreId, scoreIdSchema, score } from "@/lib/db/schema/score";

export const getScore = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(score)
    .where(eq(score.userId, session?.user.id ?? ""));
  const s = rows;
  return { score: s };
};

export const getScoreById = async (id: ScoreId) => {
  const { session } = await getUserAuth();
  const { id: scoreId } = scoreIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(score)
    .where(
      and(eq(score.id, scoreId), eq(score.userId, session?.user.id ?? ""))
    );
  if (row === undefined) return {};
  const s = row;
  return { score: s };
};

export const getLastTwoScores = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(score)
    .where(eq(score.userId, session?.user.id ?? ""))
    .orderBy(desc(score.createdAt))
    .limit(2);
  const s = rows;
  return { score: s };
};
