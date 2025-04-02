"use server";

import { revalidatePath } from "next/cache";
import {
  createAttemptTable,
  deleteAttemptTable,
  updateAttemptTable,
} from "@/lib/api/attemptTable/mutations";
import {
  AttemptTableId,
  NewAttemptTableParams,
  UpdateAttemptTableParams,
  attemptTableIdSchema,
  insertAttemptTableParams,
  updateAttemptTableParams,
} from "@/lib/db/schema/attemptTable";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAttemptTables = () => revalidatePath("/attempt-table");

export const createAttemptTableAction = async (input: NewAttemptTableParams) => {
  try {
    const payload = insertAttemptTableParams.parse(input);
    await createAttemptTable(payload);
    revalidateAttemptTables();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAttemptTableAction = async (input: UpdateAttemptTableParams) => {
  try {
    const payload = updateAttemptTableParams.parse(input);
    await updateAttemptTable(payload.id, payload);
    revalidateAttemptTables();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAttemptTableAction = async (input: AttemptTableId) => {
  try {
    const payload = attemptTableIdSchema.parse({ id: input });
    await deleteAttemptTable(payload.id);
    revalidateAttemptTables();
  } catch (e) {
    return handleErrors(e);
  }
};