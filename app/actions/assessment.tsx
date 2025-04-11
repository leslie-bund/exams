"use server";

import {
  createAttemptTable,
  deleteAttemptTable,
  updateAttemptTable,
} from "@/lib/api/attemptTable/mutations";
import { getLastAttemptTables } from "@/lib/api/attemptTable/queries";
import { createScore } from "@/lib/api/score/mutations";
import { Attempt } from "@/lib/hooks/store";

export async function beginAssessment(formData: {
  challengeCode: string;
  challengeList: string;
}) {
  try {
    const { attemptTable } = await createAttemptTable({
      challengeCode: formData.challengeCode,
      challengeList: formData.challengeList,
    });
    return attemptTable.id;
  } catch (error) {
    console.error("Error creating attempts:", error);
    return "";
  }
}

export async function trackAssessment({
  challengeList,
  id,
  challengeCode,
}: {
  challengeList: string;
  id: string;
  challengeCode: string;
}) {
  try {
    const data = await updateAttemptTable(id, {
      id,
      challengeCode,
      challengeList,
    });
    return { attemptTable: data?.attemptTable };
  } catch (error) {
    console.error("Error updating attempts:", error);
    return { attemptTable: null };
  }
}

export async function completeAssessment(id: string) {
  try {
    const data = await deleteAttemptTable(id);
    if (!data) {
      throw new Error("Failed to delete attempt table");
    }
    console.log('Deleted Table: ', data);
    const score = calculateScore(data.attemptTable.challengeList);
    await createScore({ score });

    return { attemptTable: data?.attemptTable };
  } catch (error) {
    console.error("Error completing assessment:", error);
    return { attemptTable: null };
  }
}

function calculateScore(challengeList: string) {
 try {
    const parsedList = JSON.parse(challengeList) as Attempt[];
    const score = parsedList.reduce((acc, attempt) => {
      if (attempt.answer === attempt.selectedAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return (score / parsedList.length) * 100; // Return the score as a percentage
  } catch (error) {
    console.error("Error calculating score:", error);
    return 0;
  }
}

export async function getLastAttempt() {
  try {
  const { attemptTable } = await getLastAttemptTables();
    if (!attemptTable) {
      throw new Error("No attempt table found");
    }
    return { attemptTable };
  } catch (error) {
    console.error("Error getting last attempt:", error);
    return { attemptTable: null };    
  }
}