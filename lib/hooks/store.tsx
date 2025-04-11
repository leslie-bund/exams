import { create } from "zustand";
import EXAMS from "@/config/types";
// import {
//   updateAttemptTable,
// } from "../api/attemptTable/mutations";
import {
  beginAssessment,
  completeAssessment,
  trackAssessment,
} from "@/app/actions/assessment";

export interface Attempt {
  questionId: number;
  answer: string;
  selectedAnswer: string | null;
}

interface AttemptStore {
  attempts: Attempt[];
  currentAttemptId: string | null;
  clearAttempts: () => void;
  examId: string | keyof typeof EXAMS | null;
  createAttempts: (examCode: keyof typeof EXAMS, numOfQuestion: number) => void;
  updateAttempt: (
    questionId: number,
    selectedAnswer: string,
    track?: boolean
  ) => void;
  loadAttempts: (
    attempts: Attempt[],
    examId: string,
    currentAttemptId: string
  ) => void;
}

export const useAttemptStore = create<AttemptStore>((set, get) => ({
  attempts: [],
  examId: null,
  currentAttemptId: null,
  createAttempts: async (
    examCode: keyof typeof EXAMS,
    numOfQuestion: number
  ) => {
    const questionsList = EXAMS[examCode].sort(() => Math.random() - 0.5);
    // slice the first numOfQuestion elements from the shuffled array
    const selectedQuestions = questionsList.slice(0, numOfQuestion);
    // map the selected questions to the desired format
    const attempts: Attempt[] = selectedQuestions.map((question) => ({
      questionId: question.id,
      answer: question.correctOption,
      selectedAnswer: "",
    }));

    try {
      const id = await beginAssessment({
        challengeCode: examCode,
        challengeList: JSON.stringify(attempts),
      });
      return set((state: AttemptStore) => ({
        ...state,
        attempts,
        examId: examCode,
        currentAttemptId: id,
      }));
    } catch (error) {
      console.error("Error creating attempts:", error);
    }
  },
  updateAttempt: async (
    questionId: number,
    selectedAnswer: string,
    track?: boolean
  ) => {
    const { currentAttemptId, examId } = get();
    const { attempts } = get();
    const updatedAttempts = attempts.map((attempt) => {
      if (attempt.questionId === questionId) {
        return { ...attempt, selectedAnswer };
      }
      return attempt;
    });
    try {
      if (track) {
        const update = await trackAssessment({
          challengeList: JSON.stringify(updatedAttempts),
          id: currentAttemptId!,
          challengeCode: examId!,
        });
        if (update?.attemptTable) {
          console.log(
            "Attempt updated successfully:",
            JSON.stringify(update.attemptTable, ["user_id"], 2)
          );
        }
      }
      return set((state: AttemptStore) => ({
        ...state,
        attempts: updatedAttempts,
      }));
    } catch (error) {
      console.error("Error updating attempt:", error);
    }
  },
  clearAttempts: async () => {
    const { currentAttemptId } = get();
    const { attemptTable } = await completeAssessment(currentAttemptId!);
    if (attemptTable) {
      console.log(
        "Attempt cleared successfully:",
        JSON.stringify(attemptTable, ["user_id"], 2)
      );
      set({ attempts: [], examId: null, currentAttemptId: null });
    }
  },
  loadAttempts: (
    attempts: Attempt[],
    examId: string,
    currentAttemptId: string
  ) => {
    set({ attempts, examId, currentAttemptId });
  },
}));
