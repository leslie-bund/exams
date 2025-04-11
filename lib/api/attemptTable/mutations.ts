import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import {
  AttemptTableId,
  NewAttemptTableParams,
  UpdateAttemptTableParams,
  updateAttemptTableSchema,
  insertAttemptTableSchema,
  attemptTable as attemptTableSchema,
  attemptTableIdSchema,
} from "@/lib/db/schema/attemptTable";
import { getUserAuth } from "@/lib/auth/utils";

export const createAttemptTable = async (
  attemptTable: NewAttemptTableParams
) => {
  const { session } = await getUserAuth();
  const newAttemptTable = insertAttemptTableSchema.parse({
    ...attemptTable,
    userId: session?.user.id,
  });
  try {
    const [a] = await db
      .insert(attemptTableSchema)
      .values(newAttemptTable)
      .returning();
    return { attemptTable: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAttemptTable = async (
  id: AttemptTableId,
  attemptTable: UpdateAttemptTableParams
) => {
  const { session } = await getUserAuth();
  const { id: attemptTableId } = attemptTableIdSchema.parse({ id });
  const newAttemptTable = updateAttemptTableSchema.parse({
    ...attemptTable,
    userId: session?.user.id ?? "",
  });
  try {
    if (session?.user.id !== undefined && attemptTableId !== undefined) {
      const [a] = await db
        .update(attemptTableSchema)
        .set({
          ...newAttemptTable,
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        })
        .where(
          and(
            eq(attemptTableSchema.id, attemptTableId!),
            eq(attemptTableSchema.userId, session?.user.id)
          )
        )
        .returning();
      return { attemptTable: a };
    }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAttemptTable = async (id: AttemptTableId) => {
  const { session } = await getUserAuth();
  const { id: attemptTableId } = attemptTableIdSchema.parse({ id });
  if (session?.user.id !== undefined && attemptTableId !== undefined) {
    try {
      const [a] = await db
        .delete(attemptTableSchema)
        .where(
          and(
            eq(attemptTableSchema.id, attemptTableId!),
            eq(attemptTableSchema.userId, session?.user.id)
          )
        )
        .returning();
      return { attemptTable: a };
    } catch (err) {
      const message = (err as Error).message ?? "Error, please try again";
      console.error(message);
      throw { error: message };
    }
  }
};
