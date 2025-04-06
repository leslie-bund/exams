import { create } from "zustand";
import EXAMS from "@/config/types";

interface Attempt {
  questionId: number;
  answer: string;
  selectedAnswer: string | null;
}

interface AttemptStore {
  attempts: Attempt[];
  examId: string | null;
  createAttempts: (examCode: keyof typeof EXAMS, numOfQuestion: number) => void;
  updateAttempt: (questionId: number, selectedAnswer: string) => void;
}

export const useAttemptStore = create((set) => ({
  attempts: [],
  examId: null,
  createAttempts: (examCode: keyof typeof EXAMS, numOfQuestion: number) => {
    const questionsList = EXAMS[examCode].sort(() => Math.random() - 0.5);
    // slice the first numOfQuestion elements from the shuffled array
    const selectedQuestions = questionsList.slice(0, numOfQuestion);
    // set({ attempts });
    const attempts: Attempt[] = selectedQuestions.map((question) => ({
      questionId: question.id,
      answer: question.correctOption,
      selectedAnswer: '',
    }));

    return set({
      attempts,
      examId: examCode,
    });
  },
  updateAttempt: (questionId: number, selectedAnswer: string) => {
    return set((state: AttemptStore) => ({
      attempts: state.attempts.map((attempt) =>
        attempt.questionId === questionId
          ? { ...attempt, selectedAnswer }
          : attempt
      ),
    }));
  },
}));
