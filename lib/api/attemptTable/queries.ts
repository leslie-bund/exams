import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import {
  type AttemptTableId,
  attemptTableIdSchema,
  attemptTable,
} from "@/lib/db/schema/attemptTable";

export const getAttemptTables = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(attemptTable)
    .where(eq(attemptTable.userId, session?.user.id ?? ""));
  const a = rows;
  return { attemptTable: a };
};

export const getAttemptTableById = async (id: AttemptTableId) => {
  const { session } = await getUserAuth();
  const { id: attemptTableId } = attemptTableIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(attemptTable)
    .where(
      and(
        eq(attemptTable.id, attemptTableId),
        eq(attemptTable.userId, session?.user.id ?? "")
      )
    );
  if (row === undefined) return {};
  const a = row;
  return { attemptTable: a };
};
