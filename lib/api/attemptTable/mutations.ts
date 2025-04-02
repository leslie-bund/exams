import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  AttemptTableId, 
  NewAttemptTableParams,
  UpdateAttemptTableParams, 
  updateAttemptTableSchema,
  insertAttemptTableSchema, 
  attemptTable,
  attemptTableIdSchema 
} from "@/lib/db/schema/attemptTable";
import { getUserAuth } from "@/lib/auth/utils";

export const createAttemptTable = async (attemptTable: NewAttemptTableParams) => {
  const { session } = await getUserAuth();
  const newAttemptTable = insertAttemptTableSchema.parse({ ...attemptTable, userId: session?.user.id! });
  try {
    const [a] =  await db.insert(attemptTable).values(newAttemptTable).returning();
    return { attemptTable: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAttemptTable = async (id: AttemptTableId, attemptTable: UpdateAttemptTableParams) => {
  const { session } = await getUserAuth();
  const { id: attemptTableId } = attemptTableIdSchema.parse({ id });
  const newAttemptTable = updateAttemptTableSchema.parse({ ...attemptTable, userId: session?.user.id! });
  try {
    const [a] =  await db
     .update(attemptTable)
     .set({...newAttemptTable, updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ") })
     .where(and(eq(attemptTable.id, attemptTableId!), eq(attemptTable.userId, session?.user.id!)))
     .returning();
    return { attemptTable: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAttemptTable = async (id: AttemptTableId) => {
  const { session } = await getUserAuth();
  const { id: attemptTableId } = attemptTableIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(attemptTable).where(and(eq(attemptTable.id, attemptTableId!), eq(attemptTable.userId, session?.user.id!)))
    .returning();
    return { attemptTable: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

