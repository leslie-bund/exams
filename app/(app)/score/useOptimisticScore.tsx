
import { type Score, type CompleteScore } from "@/lib/db/schema/score";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Score>) => void;

export const useOptimisticScores = (
  score: CompleteScore[],
  
) => {
  const [optimisticScores, addOptimisticScore] = useOptimistic(
    score,
    (
      currentState: CompleteScore[],
      action: OptimisticAction<Score>,
    ): CompleteScore[] => {
      const { data } = action;

      

      const optimisticScore = {
        ...data,
        
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticScore]
            : [...currentState, optimisticScore];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticScore } : item,
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticScore, optimisticScores };
};
