import { db } from "@/lib/db/index";
import { eq, and, desc, sum, sql, count } from "drizzle-orm";
import { user } from "@/lib/db/schema/auth";
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

export const getTopTenUsersWithHighestScoreTotal = async () => {
  const query = db
    .select({
      email: user.email,
      name: user.name,
      image: user.image,
      totalScore: sum(score.score).as("totalScore"),
      total: count(score.score)
    })
    .from(user)
    .innerJoin(score, eq(user.id, score.userId))
    .limit(10)
    .orderBy(sql`totalScore DESC`);
  const rows = await query;
  // console.log('Rows: ,', rows);
  return { scores: rows };
};
