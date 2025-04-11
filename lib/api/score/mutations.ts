import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import {
  ScoreId,
  NewScoreParams,
  UpdateScoreParams,
  updateScoreSchema,
  insertScoreSchema,
  score as scoreSchema,
  scoreIdSchema,
} from "@/lib/db/schema/score";
import { getUserAuth } from "@/lib/auth/utils";

export const createScore = async (score: NewScoreParams) => {
  const { session } = await getUserAuth();
  const newScore = insertScoreSchema.parse({
    ...score,
    userId: session?.user.id ?? "",
  });
  try {
    const [s] = await db.insert(scoreSchema).values(newScore).returning();
    return { score: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateScore = async (id: ScoreId, score: UpdateScoreParams) => {
  const { session } = await getUserAuth();
  const { id: scoreId } = scoreIdSchema.parse({ id });
  const newScore = updateScoreSchema.parse({
    ...score,
    userId: session?.user.id ?? "",
  });
  try {
    const [s] = await db
      .update(scoreSchema)
      .set({
        ...newScore,
        updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      })
      .where(
        and(
          eq(scoreSchema.id, scoreId!),
          eq(scoreSchema.userId, session?.user.id ?? "")
        )
      )
      .returning();
    return { score: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteScore = async (id: ScoreId) => {
  const { session } = await getUserAuth();
  const { id: scoreId } = scoreIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(scoreSchema)
      .where(
        and(
          eq(scoreSchema.id, scoreId!),
          eq(scoreSchema.userId, session?.user.id ?? "")
        )
      )
      .returning();
    return { score: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
