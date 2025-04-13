"use server";

import { revalidatePath } from "next/cache";
import {
  createScore,
  deleteScore,
  updateScore,
} from "@/lib/api/score/mutations";
import {
  ScoreId,
  NewScoreParams,
  UpdateScoreParams,
  scoreIdSchema,
  insertScoreParams,
  updateScoreParams,
} from "@/lib/db/schema/score";
import { getTopTenUsersWithHighestScoreTotal } from "../api/score/queries";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateScores = () => revalidatePath("/score");

export const createScoreAction = async (input: NewScoreParams) => {
  try {
    const payload = insertScoreParams.parse(input);
    await createScore(payload);
    revalidateScores();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateScoreAction = async (input: UpdateScoreParams) => {
  try {
    const payload = updateScoreParams.parse(input);
    await updateScore(payload.id, payload);
    revalidateScores();
  } catch (e) {
    return handleErrors(e);
  }
};

export const getLeaderboardAction = async () => {
  try {
    const {scores} = await getTopTenUsersWithHighestScoreTotal();
    return scores;
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteScoreAction = async (input: ScoreId) => {
  try {
    const payload = scoreIdSchema.parse({ id: input });
    await deleteScore(payload.id);
    revalidateScores();
  } catch (e) {
    return handleErrors(e);
  }
};